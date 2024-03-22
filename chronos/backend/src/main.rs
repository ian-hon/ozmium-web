use std::sync::Mutex;

// use data_instance::DataInstance;
// use std::time::Instant;
#[macro_use] extern crate rocket;
use rocket::State;

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
        .mount("/", routes![index])

        .attach(cors::CORS)
}
