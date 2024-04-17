var username = fetchLocalStorage("chronos_username");
var password = fetchLocalStorage("chronos_password");
// if null then redirect to landing page

if ((username === null) || (password === null)) {
    window.location.href = "./login.html";
}

var dates = [];
var dateRange = {
    "start": 0, // number of days since 1/1/1970
    "length": 7, // select the 7 days after this
    "offset": 0
}
// year, month, day offset
// var dateOffset = [0, 0, 0];

var container = document.querySelector("#main #content #day-parent");
var library = [
    {
        "type":"item",
        "title":"bla bla bla",
        "time":[1, 3],
        "day":1
    },
    {
        "type":"item",
        "title":"lorem ipsum",
        "time":[1.5, 2.5],
        "day":2
    },
    {
        "type":"container",
        "height":1,
        "position":[1, 2],
        "children":[
            {
                "type":"item",
                "title":"child 1",
                "time":[3, 4],
                "day":0
            },
            {
                "type":"item",
                "title":"child 2",
                "time":[3, 4],
                "day":0
            }
        ]
    }
]

var taskHeight = window.getComputedStyle(container).getPropertyValue('--task-height');
var taskWidth = window.getComputedStyle(container).getPropertyValue('--task-width');

var creationContainer = document.querySelector("#task-creation");

// #region utils
function login_info() {
    return JSON.stringify({
        "username":username,
        "password":password
    });
}

function parseResponse(r) {
    let result = JSON.parse(r);
    if (result['type'] != "success") {
        window.location.href = "./login.html";
        // or some kind of proper error handling
    }

    return result['data'];
}

// function isCurrent(range) {
//     return (range[0] <= getEpochDayTime()) && (getEpochDayTime() <= range[1]);
// }

// function formatTime(t) {
//     // t : time since day start

//     // var d = new Date(e * 1000);
//     // return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;

//     return [
//         String(Math.floor(t / 3600)).padStart(2, "0"),
//         // TODO:fix (done)
//         // not converting properly
//         // floating point error probably
//         // 80280 -> 8:18
//         // 80340 -> 8:18 (supposed to be 8:19)
//         String(
//             (
//                 (
//                     (t / 3600) - Math.floor(t / 3600)
//                 ) * 60
//             ).toFixed()
//             ).padStart(2, "0")
//     ];
// }

// function getEpochDayTime(d = null) {
//     // seconds elapsed since start of day
//     let t = d ? d : new Date();
//     return (t.getHours() * 3600) +
//     (t.getMinutes() * 60) +
//     (t.getSeconds());
// }

function getEpochDate(gmt=true, d = null) {
    // days since 1 jan 1970
    let now = d ? d : new Date();

    // let t = Date.parse(`${now.getUTCMonth() + 1}/${now.getUTCDate()}/${now.getUTCFullYear()} ${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()} GMT`) / 1000;
    return Math.floor((now.getTime() - (gmt ? 0 : now.getTimezoneOffset() * 60_000)) / 86400_000);
}

function roundToWeekStart(i) {
    // takes days since 1/1/1970
    // returns the date of the monday on that week

    // 1/1/1970 is Thursday; offsetting to monday
    return (Math.floor((i + 3) / 7) * 7) - 3;
}

// function cleanEditables(content) {
//     content = content.replace(new RegExp("<br>", 'g'), '');
//     content = content.replace(new RegExp("<div>", 'g'), '\n');
//     content = content.replace(new RegExp("</div>", 'g'), '');
//     return content;
// }

function cleanTimeInput(e, minute=false) {
    if (e.value.length > 2) {
        e.value = e.value.slice(0, 2);
    }
    let i = parseInt(e.value);
    if (i > (minute ? 59 : 23)) {
        e.value = (minute ? 59 : 23);
    }

    if (i < 0) {
        e.value = 0;
    }

    if (minute) {
        e.dataset.time_previous_minute = e.value;
    } else {
        e.dataset.time_previous_hour = e.value;
    }
}
// #endregion

function populateCalendar() {
    container.innerHTML = '';
    library.forEach((e) => {
        if (e["type"] == "container") {
            let batch = '';
            e['children'].forEach((i, index) => {
                batch += addItem(i, index + 1);
            })
            container.innerHTML += `<div class="item-container" style="top:calc(${taskHeight} * ${e['position'][1]}); left:calc(${taskWidth} * ${e['position'][0]}); height:calc(${taskHeight} * ${e['height']});">
    <h1>
        ${e['children'].length}
    </h1>
    <div id="user-click" onclick="toggleItemContainer(this)">
    </div>
    <div id="children">
        ${batch}
    </div>
</div>`;
        } else {
            container.innerHTML += addItem(e);
        }
    })
}

function addItem(e, i=null) {
    return `<div class="item" style="top:calc(${e['time'][0]} * ${taskHeight}); height:calc(${(e['time'][1] - e['time'][0])} * ${taskHeight} - 4ch); left:${(i === null ? `calc(var(--task-width) * ${e['day']})` : `calc(calc(var(--task-width) * ${i}) - 1ch)`)}; background:crimson;">
    <h3 id="title">${e['title']}</h3>
    <h4 id="time">${e['time'][0]}-${e['time'][1]}</h4>
</div>`
}

function fetchLibrary() {
    sendPostRequest(`${BACKEND_ADDRESS}/fetch_library/${getEpochDate() * 86400}/${(getEpochDate() + 7) * 86400}`, login_info(), (r) => {
        let response = parseResponse(r);

        console.log(response);

        populateCalendar();
    })
}

fetchLibrary();

// #region date related
function fetchDateRange() {
    // var start = getEpochDate();
    dates = [];
    dateRange['start'] = roundToWeekStart(getEpochDate(false) + dateRange['offset']) * 86400;
    for(i = 0; i < dateRange['length']; i++) {
        dates.push(dateRange['start'] + (i * 86400));
    }
}

function fetchCurrentDayIndex() {
    // current day of the week
    // monday = 0
    // tuesday = 1
    // using own utils (for consistency purposes)
    return getEpochDate(false) - roundToWeekStart(getEpochDate(false));
}

function fetchCurrentTime() {
    // 0:00 -> 0
    // 1:00 -> 1
    // 1:30 -> 1.5
    // used for task top values

    let d = new Date();
    return d.getHours() + (d.getMinutes() / 60);
}
// #endregion

// #region toggles
function toggleItemContainer(i) {
    let e = i.parentElement;
    e.ariaLabel = e.ariaLabel == "open" ? "closed" : "open";
}

function toggleTaskCreation() {

}

function toggleColourPicker(e) {
    e.parentElement.ariaLabel = e.parentElement.ariaLabel == "open" ? "closed" : "open";
}
// #endregion

// #region account related
document.querySelector("#sidebar #user-data > div h4:first-of-type").innerHTML = username;
// #endregion

// #region task creation
function cleanTimeInputAll() {
    let l = document.querySelectorAll('#task-creation #time input[type="number"]');
    cleanTimeInput(l[0]);
    cleanTimeInput(l[1], true);
    cleanTimeInput(l[2]);
    cleanTimeInput(l[3], true);
    // making a loop checking odd/even would only make the code harder to understand
    // keep it stupid simple
}

function matchEndTime(mutable=true) {
    var start_obj = document.querySelectorAll(`#task-creation #time #start input[type="number"]`);
    var end_obj = document.querySelectorAll(`#task-creation #time #end input[type="number"]`);

    var start = (parseInt(start_obj[0].dataset.time_previous_hour) * 3600) + (parseInt(start_obj[1].dataset.time_previous_minute) * 60);
    var end = (parseInt(end_obj[0].dataset.time_previous_hour) * 3600) + (parseInt(end_obj[1].dataset.time_previous_minute) * 60);

    if (mutable && (start == end)) {
        end_obj[0].value = start_obj[0].value;
        end_obj[1].value = start_obj[1].value;

        cleanTimeInput(end_obj[0]);
        cleanTimeInput(end_obj[1], true);
    }
    document.querySelector("#task-creation #time #end").dataset.matched = start == end;
}

function addTask() {
    cleanTimeInputAll(); // in case changed through inspector
    // /<r_species>/<r_time_species>/<repeating_day>/<title>/<description>/<colour>/<start>/<end>
    let r_species = document.querySelector("#task-creation #type-selection > div > label").checked ? "Task" : "Event";
    let repeating_day = 0;
    document.querySelectorAll("#task-creation #repeat > div input").forEach((e, index) => {
        repeating_day += (e.checked ? 1 : 0) * (Math.pow(2, (index - 8))); // invert to become big endian
    })
    let r_time_species = repeating_day == 0 ? "Once" : "Repeating";
    let title = document.querySelector("#task-creation #title").value;
    let description = document.querySelector("#task-creation #description").value;
    description = description ? description : ' ';
    let colour = document.querySelector("#task-creation").dataset.colour_theme;
    // let start = document.querySelector("#task-creation")
    var temp = document.querySelectorAll(`#task-creation #time #start input[type="number"]`);
    var start = (temp[0].value * 3600) + (temp[1].value * 60);
    var temp = document.querySelectorAll(`#task-creation #time #end input[type="number"]`);
    var end = (temp[0].value * 3600) + (temp[1].value * 60);


    // URI ENCODING BEFORE SENDING
    console.log(`/<${r_species}>/<${r_time_species}>/<${repeating_day}>/<${title}>/<${description}>/<${colour}>/<${start}>/<${end}>`);
}
// #endregion
