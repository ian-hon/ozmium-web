use std::collections::HashMap;

use serde::{Deserialize, Serialize};


#[derive(Serialize, Deserialize, Debug)]
pub struct OCData {
    prefixes: Vec<(String, i32)>,
    suffixes: Vec<(String, Homologous)>
}
impl OCData {
    pub fn new() -> OCData {
        OCData {
            prefixes: vec![
                ("meth", 1),
                ("eth", 2),
                ("prop", 3),
                ("but", 4),
                ("pent", 5),
                ("hex", 6),
                ("hept", 7),
                ("oct", 8),
                ("non", 9),
                ("dec", 10),
            ].iter().map(|x| (x.0.to_string(), x.1)).collect::<Vec<(String, i32)>>(),
            suffixes: vec![
                ("ane", Homologous::Alkane),
                ("ene", Homologous::Alkene),
                ("yne", Homologous::Alkyne),
                ("ol", Homologous::Alcohol),
                ("anoic", Homologous::Carboxylic),
                ("anoate", Homologous::Ester),
            ].iter().map(|x| (x.0.to_string(), x.1)).collect::<Vec<(String, Homologous)>>()
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct OCompound {
    series: Homologous,
    n: i32,
    m: i32,
    fn_group: i32,
    branches: HashMap<i32, Vec<i32>>
    //               <carbon location, type of branch>
    //                                 methyl, ethyl, etc etc
}
impl OCompound {
    pub fn new(data: &OCData, input_string: String) -> OCompound {
        let result = OCompound::parse_input(data, input_string);

        if result.is_err() {
            panic!("backend error : {result:?}");
        }

        result.unwrap()
    }

    pub fn parse_input(data: &OCData, input_string: String) -> Result<OCompound, ParseResult> {
        let mut result: OCompound = OCompound {
            series: Homologous::Alkane,
            n: 0,
            m: 0,
            fn_group: 0,
            branches: HashMap::new()
        };

        let mut found = 0;
        // must pass multiple checks
        // prefix check (+1)
        // suffix check (+1)
        // max value = 2

        for x in &data.suffixes {
            if input_string.contains(x.0.as_str()) {
                result.series = x.1;
                found += 1;
                break;
            }
        }

        if result.series == Homologous::Ester {
            let partitions = input_string.split(" ").collect::<Vec<&str>>();

            let mut count = 0;

            for x in partitions {
                for y in &data.prefixes {
                    if x.contains(y.0.as_str()) {
                        count += 1;
                        if count == 1 {
                            result.n = y.1.clone();
                            // first word
                            // ethyl ethanoate
                            // ^^^^^
                        } else {
                            result.m = y.1.clone();
                            // second word
                            // ethyl ethanoate
                            //       ^^^^^^^^^
                            break;
                        }
                    }
                }
                if count >= 2 {
                    found += 1;
                    break;
                }
            }

            if count < 2 {
                return Err(ParseResult::EsterNotEnough)
            }
        } else {
            for x in &data.prefixes {
                if input_string.contains(x.0.as_str()) {
                    result.n = x.1;
                    found += 1;
                    break;
                }
            }
        }

        if found != 2 {
            return Err(ParseResult::Invalid)
        }
        Ok(result)
    }

    pub fn to_string(&self) -> String {
        // ₁₂₃₄₅₆₇₈₉₀
        match self.series {
            Homologous::Alkane => format!("C{}H{}", OCompound::get_subscript(self.n), OCompound::get_subscript((self.n * 2) + 2)),
            Homologous::Alkene => format!("C{}H{}", OCompound::get_subscript(self.n), OCompound::get_subscript(self.n * 2)),
            Homologous::Alkyne => format!("C{}H{}", OCompound::get_subscript(self.n), OCompound::get_subscript((self.n * 2) - 2)),
            Homologous::Alcohol => format!("C{}H{}OH", OCompound::get_subscript(self.n), OCompound::get_subscript((self.n * 2) + 1)),
            Homologous::Carboxylic => format!("C{}H{}COOH", OCompound::get_subscript(self.n - 1), OCompound::get_subscript(((self.n - 1) * 2) + 1)),
            Homologous::Ester => format!("C{}H{}COOC{}H{}", OCompound::get_subscript(self.n - 1), OCompound::get_subscript(((self.n - 1) * 2) + 1), OCompound::get_subscript(self.m), OCompound::get_subscript((self.m * 2) + 1)),
        }
    }

    pub fn get_subscript(number: i32) -> String {
        if number == 1 {
            return "".to_string();
        }

        let c: HashMap<char, char> = HashMap::from([
            ('0', '₀'),
            ('1', '₁'),
            ('2', '₂'),
            ('3', '₃'),
            ('4', '₄'),
            ('5', '₅'),
            ('6', '₆'),
            ('7', '₇'),
            ('8', '₈'),
            ('9', '₉')
        ]);

        number.to_string().chars().map(|x| c.get(&x).unwrap()).collect::<String>()
    }

    pub fn remove_oc(data: &OCData, o_compound: &OCompound,input_string: String) -> String {
        let mut query_string = "".to_string();
        for x in &data.prefixes {
            if x.1 == o_compound.n {
                query_string += x.0.as_str();
            }
        }

        for x in &data.suffixes {
            if x.1 == o_compound.series {
                query_string += x.0.as_str();
            }
        }

        query_string
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq, Clone, Copy)]
pub enum Homologous {
    Alkane,
    Alkene,
    Alkyne,
    Alcohol,
    Carboxylic,
    Ester
}

#[derive(Debug)]
pub enum ParseResult {
    Ok,
    Invalid,
    AmountLow,
    EsterNotEnough
}
