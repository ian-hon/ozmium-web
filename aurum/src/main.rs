#[macro_use] extern crate rocket;
use rocket::{
    State,
};
use rand::prelude::*;
use std::sync::Mutex;
use std::time::Instant;

mod cors;
mod stock;
mod market;
mod ticker;
use market::Market;


#[get("/")]
fn index() -> &'static str {
    "can you understand me?"
}

#[get("/<iterations>")]
fn age(iterations:i32, data_holder: &State<Mutex<Market>>) -> String {
    let mut result = "".to_string();

    let mut data = data_holder.lock().unwrap();
    let now = Instant::now();
    for x in &mut (*data).stocks {
        for _ in 0..iterations {
            x.age();
        }
        result += &format!("{:?} : {:?} values, \n", x.name, x.history.len()).to_string();
    }

    format!("{} stocks aged\n{:?}μs elapsed ({}s)\n{result}", (*data).stocks.len(), now.elapsed().as_micros(), now.elapsed().as_secs_f64())
}

#[get("/")]
fn get_svg(data_holder: &State<Mutex<Market>>) -> String {
    let data = data_holder.lock().unwrap();

    let now = Instant::now();
    for x in &(*data).stocks {
        x.generate_svg(1600f64, 900f64);
        println!("{}'s graph generated", x.name);
    }

    format!("{} svgs generated\n{:?}ms elapsed ({}s)", (*data).stocks.len(), now.elapsed().as_millis(), now.elapsed().as_secs_f64())
}

#[get("/")]
fn age_svg(data_holder: &State<Mutex<Market>>) -> String {
    let mut result = "".to_string();

    let mut data = data_holder.lock().unwrap();
    let now = Instant::now();
    for x in &mut (*data).stocks {
        x.age();
        result += &format!("{:?} : {:?} values, \n", x.name, x.history.len()).to_string();
    }

    for x in &(*data).stocks {
        x.generate_svg(1600f64, 900f64);
        println!("{}'s graph generated", x.name);
    }

    format!("{} svgs generated\n{:?}ms elapsed ({}s)\n{} stocks aged\n{:?}μs elapsed ({}s)\n{result}", (*data).stocks.len(), now.elapsed().as_millis(), now.elapsed().as_secs_f64(), (*data).stocks.len(), now.elapsed().as_micros(), now.elapsed().as_secs_f64())

}

#[get("/<trend>/<amount>")]
fn fetch_stocks(amount: i32, trend: String, data_holder: &State<Mutex<Market>>) -> String {
    let data = data_holder.lock().unwrap();
    stock::Stock::fetch_stocks(trend, &data.stocks, amount)
}

#[get("/")]
fn purge(data_holder: &State<Mutex<Market>>) {
    let mut data = data_holder.lock().unwrap();
    for x in &mut data.stocks {
        x.history = vec![];
        x.growth_rate = 0.0;
        x.bankrupt = false;
    }
}

#[get("/")]
fn debug(data_holder: &State<Mutex<Market>>) -> String {
    let data = data_holder.lock().unwrap();
    let mut result = "".to_string();
    for x in &data.stocks {
        result += format!("{} : {}\n", x.name, x.growth_rate).as_str();
    }
    result
}

#[launch]
fn rocket() -> _ {
    let mut t = ticker::Ticker {
        library: ticker::TickerLibrary::new()
    };

    t.refresh_library();

    println!("{}", t.generate(1.0));
    
    rocket::build()
        .manage(Mutex::new(Market::new()))
        .mount("/", routes![index])
        .mount("/age", routes![age])
        .mount("/svg", routes![get_svg])
        .mount("/debug", routes![debug])
        .mount("/fetch_stock", routes![fetch_stocks])
        .mount("/age_svg", routes![age_svg])
        .mount("/purge", routes![purge])

        .attach(cors::CORS)
}
