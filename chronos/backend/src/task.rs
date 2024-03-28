use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub struct Task {
    // unique for each day per user
    // day : 0
    //  task : 0,1,2
    // day : 1
    //  task : 0,1,2,3
    pub id: usize,
    pub title: String,
    // seconds elapsed since start of day
    // 0 -> 00:00
    // 42300 -> 12:00
    // 86400 -> 24:00
    pub start: u128,
    pub end: u128,
    pub completed: bool
}