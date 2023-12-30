use std::sync::Mutex;
use std::time::Instant;
#[macro_use] extern crate rocket;
use rocket::State;
use rocket::http::Header;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};

use rand::prelude::*;

mod chem;
use chem::OCompound;

pub struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "cors headers",
            kind: Kind::Response
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Access-Control-Allow-Methods", "POST, GET, PATCH, OPTIONS"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

pub struct DataHolder {
    data: chem::OCData
}
impl DataHolder {
    pub fn new() -> DataHolder {
        DataHolder {
            data: chem::OCData::new()
        }
    }
}

#[get("/")]
fn index() -> &'static str {
    "can you understand me?"
}

#[get("/<name>")]
fn fetch_info(name: String) -> String {
    
    "".to_string()
}

// #[launch]
// fn rocket() -> _ {
//     rocket::build()
//         .manage(Mutex::new(DataHolder::new()))
//         .mount("/", routes![index])
//         .mount("/fetch_info", routes![fetch_info])

//         .attach(CORS)
// }

fn main() {
    let data_holder = DataHolder::new();

    for x in ["propan-2-ol", "methane", "methene", "ethan-1,2-diol"] {
        // ethan-1,2-diol
        // 1,1,1-trichloroethane
        //    cl  H
        // cl C - C H
        //    cl  H
        // 1,2-dimethylethane
        //println!("{x} : {:?}", chem::OCompound::parse_input(&data_holder.data, x.to_string()));
        let c = chem::OCompound::parse_input(&data_holder.data, x.to_string()).unwrap();
        println!("{x} : {:?}", chem::OCompound::remove_oc(&data_holder.data, &c, x.to_string()));
        //println!("{x} : {}", chem::OCompound::parse_input(&data_holder.data, x.to_string()).unwrap().to_string());
    }
}
