use crate::stock::Stock;
use rand::prelude::*;

#[derive(Debug)]
pub struct Market {
    pub stocks: Vec<Stock>
}
impl Market {
    pub fn new() -> Market {
        let mut r = Market {
            stocks: vec![]
        };

        // r.stocks.push(Stock {
        //    id: 0u64,
        //    name: "yttrium".to_string(),
        //    magnitude: 0.05f64,
        //    history: vec![200f64]
        // });

        for i in ["Hydrogen","Helium","Lithium","Beryllium","Boron","Carbon","Nitrogen","Oxygen","Fluorine","Neon","Sodium","Magnesium","Aluminum","Silicon","Phosphorus","Sulfur","Chlorine","Argon","Potassium","Calcium","Scandium","Titanium","Vanadium","Chromium","Manganese","Iron","Cobalt","Nickel","Copper","Zinc","Gallium","Germanium","Arsenic","Selenium","Bromine","Krypton","Rubidium","Strontium","Yttrium","Zirconium","Niobium","Molybdenum","Technetium","Ruthenium","Rhodium","Palladium","Silver","Cadmium","Indium","Tin","Antimony","Tellurium","Iodine","Xenon","Cesium","Barium","Lanthanum","Cerium","Praseodymium","Neodymium","Promethium","Samarium","Europium","Gadolinium","Terbium","Dysprosium","Holmium","Erbium","Thulium","Ytterbium","Lutetium","Hafnium","Tantalum","Wolfram","Rhenium","Osmium","Iridium","Platinum","Gold","Mercury","Thallium","Lead","Bismuth","Polonium","Astatine","Radon","Francium","Radium","Actinium","Thorium","Protactinium","Uranium","Neptunium","Plutonium","Americium","Curium","Berkelium","Californium","Einsteinium","Fermium","Mendelevium","Nobelium","Lawrencium","Rutherfordium","Dubnium","Seaborgium","Bohrium","Hassium","Meitnerium","Darmstadtium","Roentgenium","Copernicium","Nihonium","Flerovium","Moscovium","Livermorium","Tennessine","Oganesson"] {
        //for i in ["Carbon"] {
            r.stocks.push(Stock {
                id: r.stocks.len() as u64,
                name: i.to_string(),
                magnitude: rand::thread_rng().gen_range(0.01..=10.0),
                history: vec![rand::thread_rng().gen_range(250.0..350.0)],
                growth_rate: 0.0,
                bankrupt: false
            });
        }

        for _ in 0..100 {
            for x in &mut r.stocks {
                x.age();
            }
        }

        // r.stocks = vec![
        //     Stock {
        //         id: 0,
        //         name: "Child Grooming".to_string(),
        //         magnitude: 1000.0,
        //         history: vec![5000.0],
        //         growth_rate: 0.0
        //     }
        // ];

        for x in &mut r.stocks {
            x.generate_svg(1100.0, 700.0);
        }

        // r.stocks = vec![
        //     Stock {
        //         id: 0,
        //         name: "test".to_string(),
        //         magnitude: 50.0,
        //         history: vec![
        //             100.0, 120.0
        //         ],
        //         growth_rate:0.0
        //     }
        // ];
        // println!("Growth rate : {}", r.stocks[0].growth_rate());
        // panic!();
        r
    }
}