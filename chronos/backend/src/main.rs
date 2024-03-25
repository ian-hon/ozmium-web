use std::sync::Mutex;

// use data_instance::DataInstance;
// use std::time::Instant;
#[macro_use] extern crate rocket;
use rocket::State;

mod utils;
mod cors;

mod user;
mod account_handler;

use account_handler::{AccountResult, Database};

#[get("/")]
fn index() -> String {
    "can you understand me?".to_string()
}

#[get("/")]
fn debug(db: &State<Mutex<Database>>) -> String {
    let db = db.lock().unwrap();
    format!("{:?}", db)
}

#[get("/")]
fn load(db: &State<Mutex<Database>>) -> String {
    let mut db = db.lock().unwrap();
    *db = Database::load();
    "success".to_string()
}

#[get("/")]
fn save(db: &State<Mutex<Database>>) -> String {
    let db = db.lock().unwrap();
    db.save();
    "success".to_string()
}

#[get("/<username>/<password>")]
fn login(db: &State<Mutex<Database>>, username: String, password: String) -> String {
    let db = db.lock().unwrap();
    let result = db.login(&username, &password);
    match result {
        // AccountResult::Success(_) => result.to_string(),
        // _ => format!("{{{result}:0}}")

        AccountResult::Success(i) => format!("{{\"type\":\"Success\",\"user_id\":{i}}}"),
        _ => format!("{{\"type\":{result},\"user_id\":0}}")
    }
}

#[get("/<username>/<password>")]
fn signup(db: &State<Mutex<Database>>, username: String, password: String) -> String {
    let mut db = db.lock().unwrap();
    let result = db.signup(&username, &password);
    match result {
        AccountResult::Success(i) => format!("{{\"type\":\"Success\",\"user_id\":{i}}}"),
        _ => format!("{{\"type\":{result},\"user_id\":0}}")
    }
}

// time -> current epoch unix
#[get("/<user_id>/<time>")]
fn fetch_library(db: &State<Mutex<Database>>, user_id: u128, time: u128) -> String {
    let db = db.lock().unwrap();
    serde_json::to_string_pretty(&db.fetch_library(user_id, utils::get_date(time))).unwrap()
}

// title in encoded uri
// hello world -> hello%20world
#[get("/<user_id>/<title>/<start>/<end>")]
fn add_task(db: &State<Mutex<Database>>, user_id: u128, title:String, start:u128, end:u128) -> String {
    let mut db = db.lock().unwrap();
    db.users.get_mut(&user_id).unwrap().add_task(urlencoding::decode(title.as_str()).unwrap().to_string(), start, end);
    db.save();
    "success".to_string()
}

// time -> current epoch unix
#[get("/<user_id>/<task_id>/<time>")]
fn remove_task(db: &State<Mutex<Database>>, user_id: u128, task_id: usize, time: u128) -> String {
    let mut db = db.lock().unwrap();
    db.users.get_mut(&user_id).unwrap().delete_task(task_id, utils::get_date(time));
    db.save();
    "success".to_string()
}

// time -> current epoch unix
#[get("/<user_id>/<task_id>/<time>/<state>")]
fn complete_task(db: &State<Mutex<Database>>, user_id: u128, task_id: usize, time: u128, state: bool) -> String {
    let mut db = db.lock().unwrap();
    db.users.get_mut(&user_id).unwrap().complete_task(task_id, utils::get_date(time), state);
    db.save();
    "success".to_string()
}

#[get("/<user_id>/<task_id>/<time>/<title>")]
fn update_task(db: &State<Mutex<Database>>, user_id: u128, task_id: usize, time: u128, title: String) -> String {
    let mut db = db.lock().unwrap();
    db.users.get_mut(&user_id).unwrap().update_task(task_id, utils::get_date(time), urlencoding::decode(&title).unwrap().to_string());
    db.save();
    "success".to_string()
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        // .manage(Mutex::new(data_instance::DataInstance::new()))
        .manage(Mutex::new(Database::load()))
        .mount("/save", routes![save])
        .mount("/load", routes![load])
        .mount("/debug", routes![debug])

        .mount("/login", routes![login])
        .mount("/sign_up", routes![signup])

        .mount("/fetch_library", routes![fetch_library])
        .mount("/add_task", routes![add_task])
        .mount("/remove_task", routes![remove_task])
        .mount("/complete_task", routes![complete_task])
        .mount("/update_task", routes![update_task])

        .mount("/", routes![index])

        .attach(cors::CORS)
}
