use std::collections::HashMap;

use serde::{Deserialize, Serialize};

use crate::utils;

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub struct User {
    pub id: u128,
    pub name: String,
    pub library: HashMap<u128, Vec<Task>>
    // k: date
    // day in epoch unix
    // 0 -> 1 jan 1970
    // 1 -> 2 jan 1970
}
impl User {
    pub fn add_task(&mut self, title: String, start: u128, end: u128) {
        let result = self.library.get_mut(&utils::get_date(start));
        if result.is_none() {
            self.library.insert(utils::get_date(start), vec![
                Task {
                    id: 0,
                    title,
                    start,
                    end,
                    completed: false
                }]);
        } else {
            let result = result.unwrap().clone();
            let mut len = 0;
            if result.len() > 0 {
                let ord = result.iter().max_by(|x, y| x.id.cmp(&y.id));
                len = ord.unwrap().id + 1;
            }
            // let len = (&result).len();

            self.library.get_mut(&utils::get_date(start)).unwrap().push(
                Task {
                    id: len,
                    title,
                    start,
                    end,
                    completed: false
                }
            );
        }
    }

    pub fn complete_task(&mut self, task_id: usize, date: u128, state: bool) {
        let result = self.library.get_mut(&date);
        if result.is_none() {
            return;
        }

        // let target = User::get_index(task_id, result.unwrap());
        // self.library.get_mut(&date).unwrap()[target.unwrap()].completed = true;
        self.library
            .get_mut(&date)
            .unwrap()
            .iter_mut()
            .filter(|x| x.id == task_id)
            .collect::<Vec<&mut Task>>()[0].completed = state;
    }

    pub fn fetch_library(&self, date: u128) -> Option<Vec<Task>> {
        if self.library.get(&date).is_none() {
            // load
            None
        } else {
            Some(self.library.get(&date).unwrap().clone())
        }
    }

    pub fn delete_task(&mut self, task_id: usize, date: u128) {
        let result = self.library.get_mut(&date);
        if result.is_none() {
            return;
        }
        
        let target = User::get_index(task_id, result.unwrap());

        if target.is_none() {
            return;
        }
        self.library.get_mut(&date).unwrap().remove(target.unwrap());
    }

    pub fn update_task(&mut self, task_id: usize, date: u128, title: String) {
        let result = self.library.get_mut(&date);
        if result.is_none() {
            return;
        }

        self.library
            .get_mut(&date)
            .unwrap()
            .iter_mut()
            .filter(|x| x.id == task_id)
            .collect::<Vec<&mut Task>>()[0].title = title;
    }

    fn get_index(task_id: usize, collection: &Vec<Task>) -> Option<usize> {
        // TODO:optimize
        for (index, item) in collection.clone().iter().enumerate() {
            if item.id == task_id {
                return Some(index);
            }
        }
        None
    }
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub struct Task {
    // unique for each day per user
    // day : 0
    //  task : 0,1,2
    // day : 1
    //  task : 0,1,2,3
    pub id: usize,
    pub title: String,
    pub start: u128,
    pub end: u128,
    pub completed: bool
}