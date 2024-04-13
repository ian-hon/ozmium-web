use std::{
    sync::Mutex,
    str::FromStr
};

// use data_instance::DataInstance;
// use std::time::Instant;
#[macro_use] extern crate rocket;
use rocket::{
    State
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

// #region change get to post
#[post("/", data="<login>")]
fn login(db: &State<Mutex<Database>>, login: LoginInformation) -> String {
    let db = db.lock().unwrap();
    let result = db.login(&login);
    match result {
        // AccountResult::Success(_) => result.to_string(),
        // _ => format!("{{{result}:0}}")
        // AccountResult::Success(i) => utils::parse_response("success".to_string(), )

        AccountResult::Success(i) => format!("{{\"type\":\"success\",\"user_id\":{i}}}"),
        _ => format!("{{\"type\":{result},\"user_id\":0}}")
    }
}

#[post("/", data="<login>")]
fn signup(db: &State<Mutex<Database>>, login: LoginInformation) -> String {
    let mut db = db.lock().unwrap();
    let result = db.signup(&login);
    match result {
        AccountResult::Success(i) => format!("{{\"type\":\"success\",\"user_id\":{i}}}"),
        _ => format!("{{\"type\":{result},\"user_id\":0}}")
    }
}

#[post("/<start>/<end>", data="<login>")]
fn fetch_library(db: &State<Mutex<Database>>, login: LoginInformation, start: u128, end: u128) -> String {
    let db = db.lock().unwrap();
    let result = db.login(&login);
    match result {
        AccountResult::Success(user_id) => utils::parse_response(Some(serde_json::to_string(&db.users.get(&user_id).unwrap().fetch_library(start, end)).unwrap())),
        _ => utils::parse_response(None)
    }
}

#[post("/<r_species>/<r_time_species>/<repeating_day>/<title>/<description>/<start>/<end>", data="<login>")]
fn add_task(db: &State<Mutex<Database>>, login: LoginInformation, r_species: String, r_time_species: String, repeating_day: u128, title: String, description: String, start: u128, end: Option<u128>) -> String {
    let mut db = db.lock().unwrap();
    let result = db.login(&login);
    match result {
        AccountResult::Success(user_id) => {
            let species = match task::Species::from_str(&r_species) {
                Ok(i) => i,
                Err(_) => return utils::parse_response(None)
            };
            let time_species = match task::TimeSpecies::from_str(&r_time_species) {
                Ok(i) => match i {
                    task::TimeSpecies::Repeating(_) => task::TimeSpecies::Repeating(repeating_day as u8),
                    _ => i
                },
                Err(_) => return utils::parse_response(None)
            };
            db.users.get_mut(&user_id).unwrap().add_task(species, time_species, title, description, start, end, false);
            db.save();
            utils::parse_response(Some("success".to_string()))
        },
        _ => utils::parse_response(None)
    }
}

#[post("/<task_id>", data="<login>")]
fn complete_task(db: &State<Mutex<Database>>, login: LoginInformation, task_id: u128) -> String {
    let mut db = db.lock().unwrap();
    let result = db.login(&login);
    match result {
        AccountResult::Success(user_id) => {
            db.save();
            utils::parse_response(Some(db.users.get_mut(&user_id).unwrap().complete_task(task_id as usize).to_string()))
        },
        _ => utils::parse_response(None)
    }
    // utils::parse_response(Some(result.to_string()))
}
// #endregion

#[launch]
fn rocket() -> _ {
    println!("{:?}", task::TimeSpecies::from_str("Repeating(1)"));

    // rocket::build()
    rocket::custom(rocket::config::Config::figment().merge(("port", 7999)))
        // .manage(Mutex::new(data_instance::DataInstance::new()))
        .manage(Mutex::new(Database::load()))
        .mount("/save", routes![save])
        .mount("/load", routes![load])
        .mount("/debug", routes![debug])

        .mount("/login", routes![login])
        .mount("/sign_up", routes![signup])

        .mount("/add_task", routes![add_task])
        .mount("/complete_task", routes![complete_task])
        .mount("/fetch_library", routes![fetch_library])

        .mount("/", routes![index])

        .attach(cors::CORS)
}
