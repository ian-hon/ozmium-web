use std::{collections::HashMap, fmt};

use serde::{Deserialize, Serialize};

use crate::{utils, task};

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub struct User {
    pub id: u128,
    pub name: String,
    pub library: HashMap<usize, task::Task>,
    // pub repeating_tasks: Vec<task::Task>
}
impl User {
    pub fn add_task(&mut self, species: task::Species, time_species: task::TimeSpecies, title: String, description: String, start: u128, end: Option<u128>, colour: u128) {
        let id = self.generate_task_id();
        self.library.insert(id, task::Task {
            id,
            species,
            time_species,
            title,
            description,
            start,
            end,
            colour
        });
    }

    pub fn complete_task(&mut self, id: usize) -> TaskError {
        let task = self.library.get_mut(&id);
        if task.is_none() {
            return TaskError::TaskNoExist;
        }
        let task = task.unwrap();

        match task.time_species {
            task::TimeSpecies::Repeating(d) => {
                // TODO:implement
                // self.add_task(with the start date = that day of the week)
                return TaskError::Success;
            },
            _ => {}
        }

        match &mut task.species {
            task::Species::Task(c) => {
                *c = !*c;
                return TaskError::Success;
            }
            _ => {}
        }

        TaskError::Success
    }

    pub fn delete_task(&mut self, id: usize) -> TaskError {
        let result = self.library.get(&id);
        if result.is_none() {
            return TaskError::TaskNoExist;
        }
        self.library.remove(&id);

        TaskError::Success
    }

    pub fn update_task(&mut self, id:usize, species: task::Species, time_species: task::TimeSpecies, title: String, description: String, start: u128, end: Option<u128>, colour: u128) -> TaskError {
        let result = self.library.get_mut(&id);
        if result.is_none() {
            return TaskError::TaskNoExist;
        }
        let mut_ref = result.unwrap();
        mut_ref.species = species;
        mut_ref.time_species = time_species;
        mut_ref.title = title;
        mut_ref.description = description;
        mut_ref.colour = colour;
        mut_ref.start = start;
        mut_ref.end = end;

        TaskError::Success
    }

    fn generate_task_id(&self) -> usize {
        let r = self.library
            .clone()
            .iter()
            .map(|(x, _) | x.clone())
            .max();
        if r.is_none() {
            return 0;
        }
        r.unwrap() + 1
    }

    // from when to when
    // usually 7 days (maybe)
    pub fn fetch_library(&self, start: u128, end: u128) -> Vec<task::Task> {
        self.library
            .iter()
            .filter(|x| x.1.in_range(start, end))
            .map(|x| x.1.clone())
            .collect::<Vec<task::Task>>()
    }
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord, Clone, Copy)]
pub enum TaskError {
    Success,

    TaskNoExist
}
impl fmt::Display for TaskError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{:?}", self)
    }
}
