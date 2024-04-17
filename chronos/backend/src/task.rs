use serde::{Deserialize, Serialize};
use strum_macros::EnumString;

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub struct Task {
    // unique per user
    // user a : 0...∞
    // user b : 0...∞
    pub id: usize,
    pub species: Species,
    pub time_species: TimeSpecies,
    pub title: String,
    pub description: String,
    // epoch unix (at GMT ofc)
    pub start: u128,
    pub end: Option<u128>, // if end is none, there is no end time
    pub colour: u128,
}
impl Task {
    pub fn in_range(&self, start: u128, end: u128) -> bool {
        if self.end.is_none() {
            return (self.start >= start) && (end >= self.start);
        }
        ((self.start >= start) && (start >= self.end.unwrap())) || ((self.start >= end) && (end >= self.end.unwrap()))
    }
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord, Clone, Copy, EnumString)]
pub enum Species {
    Task(bool),
    Event
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord, Clone, Copy, EnumString)]
pub enum TimeSpecies {
    Once, // occurs once only

    Repeating(u8) // days of the week to repeat
    // eg : 10010000 gym every monday and thursday
    // ignore first bit
}
