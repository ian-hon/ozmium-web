use std::sync::Mutex;

// use data_instance::DataInstance;
// use std::time::Instant;
#[macro_use] extern crate rocket;
use rocket::{
    State,
    response::status,
    http::Status
};

mod utils;
mod cors;

mod login_info;
mod task;
mod user;
mod account_handler;

use account_handler::{AccountResult, Database};
use login_info::LoginInformation;

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
    let mut db = db.lock().unwrap();
    db.save();
    "success".to_string()
}

// unused
// client should already know username on login
#[get("/<user_id>")]
fn fetch_username(db: &State<Mutex<Database>>, user_id: u128) -> String {
    let db = db.lock().unwrap();
    db.fetch_username(user_id)
}

// #region change get to post
#[post("/", data="<login>")]
fn login(db: &State<Mutex<Database>>, login: LoginInformation) -> String {
    let db = db.lock().unwrap();
    let result = db.login(&login);
    match result {
        // AccountResult::Success(_) => result.to_string(),
        // _ => format!("{{{result}:0}}")

        AccountResult::Success(i) => format!("{{\"type\":\"Success\",\"user_id\":{i}}}"),
        _ => format!("{{\"type\":{result},\"user_id\":0}}")
    }
}

#[post("/", data="<login>")]
fn signup(db: &State<Mutex<Database>>, login: LoginInformation) -> String {
    let mut db = db.lock().unwrap();
    let result = db.signup(&login);
    match result {
        AccountResult::Success(i) => format!("{{\"type\":\"Success\",\"user_id\":{i}}}"),
        _ => format!("{{\"type\":{result},\"user_id\":0}}")
    }
}

// time -> current epoch unix
#[post("/<epoch_date>", data="<login>")]
fn fetch_library(db: &State<Mutex<Database>>, login: LoginInformation, epoch_date: u128) -> String {
    let db = db.lock().unwrap();
    let result = db.login(&login);
    match result {
        AccountResult::Success(user_id) => serde_json::to_string_pretty(&db.fetch_library(user_id, epoch_date)).unwrap(),
        _ => result.to_string()
    }
}

// title in encoded uri
// hello world -> hello%20world
#[post("/<title>/<epoch_date>/<start>/<end>", data="<login>")]
fn add_task(db: &State<Mutex<Database>>, login: LoginInformation, title:String, epoch_date:u128, start:u128, end:u128) -> String {
    let mut db = db.lock().unwrap();
    let result = db.login(&login);
    match result {
        AccountResult::Success(user_id) => {
            db.users.get_mut(&user_id).unwrap().add_task(urlencoding::decode(title.as_str()).unwrap().to_string(), epoch_date, start, end);
            db.save();
            "success".to_string()
        },
        _ => result.to_string()
    }
}

// time -> current epoch unix
#[post("/<task_id>/<epoch_date>", data="<login>")]
fn remove_task(db: &State<Mutex<Database>>, login: LoginInformation, task_id: usize, epoch_date: u128) -> String {
    let mut db = db.lock().unwrap();
    let result = db.login(&login);
    match result {
        AccountResult::Success(user_id) => {
            db.users.get_mut(&user_id).unwrap().delete_task(task_id, epoch_date);
            db.save();
            "success".to_string()
        },
        _ => result.to_string()
    }
}

// time -> current epoch unix
#[post("/<task_id>/<epoch_date>/<state>", data="<login>")]
fn complete_task(db: &State<Mutex<Database>>, login: LoginInformation, task_id: usize, epoch_date: u128, state: bool) -> String {
    let mut db = db.lock().unwrap();
    let result = db.login(&login);
    match result {
        AccountResult::Success(user_id) => {
            db.users.get_mut(&user_id).unwrap().complete_task(task_id, epoch_date, state);
            db.save();
            "success".to_string()
        },
        _ => result.to_string()
    }
}

#[post("/<task_id>/<epoch_date>/<start>/<end>/<title>", data="<login>")]
fn update_task(db: &State<Mutex<Database>>, login: LoginInformation, task_id: usize, epoch_date: u128, start: u128, end: u128, title: String) -> String {
    let mut db = db.lock().unwrap();
    let result = db.login(&login);
    match result {
        AccountResult::Success(user_id) => {
            db.users.get_mut(&user_id).unwrap().update_task(task_id, epoch_date, start, end, urlencoding::decode(&title).unwrap().to_string());
            db.save();
            "success".to_string()
        },
        _ => result.to_string()
    }
}
// #endregion

// #[post("/", format="application/json", data="<login>")]
// fn post_test(db: &State<Mutex<Database>>, login: LoginInformation) -> String {
//     // println!("{login:?}");
//     let db = db.lock().unwrap();
//     // TODO:continue this
//     // println!("{hmm:?}");
//     // status::Accepted(Some(format!("can you understand me?")))
//     // status::Custom(Status::Ok, format!("can you understand me?"))
//     "can you understand me?".to_string()
// }

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

        .mount("/fetch_username", routes![fetch_username])

        .mount("/fetch_library", routes![fetch_library])
        .mount("/add_task", routes![add_task])
        .mount("/remove_task", routes![remove_task])
        .mount("/complete_task", routes![complete_task])
        .mount("/update_task", routes![update_task])

        .mount("/", routes![index])

        // .mount("/post_test", routes![post_test])

        .attach(cors::CORS)
}
