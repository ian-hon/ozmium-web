use rand::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use std::collections::HashMap;
use std::fs;

#[derive(Serialize, Deserialize, Debug)]
pub struct TickerLibrary {
    pub increase: HashMap<String, Vec<String>>,
    pub decrease: HashMap<String, Vec<String>>
}
impl TickerLibrary {
    pub fn new() -> TickerLibrary {
        TickerLibrary {
            increase: HashMap::new(),
            decrease: HashMap::new()
        }
    }
}sc

pub struct Ticker {
    pub library: TickerLibrary
}
impl Ticker {
    pub fn refresh_library(&mut self) {
        self.library = serde_json::from_str(fs::read_to_string("ticker.json").unwrap().as_str()).unwrap();
    }

    pub fn generate(&self, i: f32) -> String {
        let c = { if i > 0f32 { self.library.increase.clone() } else { self.library.decrease.clone() } }.get(&{ if i.abs() > 5f32 { "dramatic".to_string() } else { "moderate".to_string() }}).unwrap().clone();
        c[rand::thread_rng().gen_range(0..c.len())].clone()
    }
}