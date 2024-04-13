var username = fetchLocalStorage("chronos_username");
var password = fetchLocalStorage("chronos_password");
// if null then redirect to landing page

if ((username === null) || (password === null)) {
    window.location.href = "./login.html";
}

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

function getEpochDate(d = null) {
    // days since 1 jan 1970
    let now = d ? d : new Date();
    let t = Date.parse(`${now.getUTCMonth() + 1}/${now.getUTCDate()}/${now.getUTCFullYear()} ${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()} GMT`) / 1000;
    return Math.floor(t / 86400);
}

// function cleanEditables(content) {
//     content = content.replace(new RegExp("<br>", 'g'), '');
//     content = content.replace(new RegExp("<div>", 'g'), '\n');
//     content = content.replace(new RegExp("</div>", 'g'), '');
//     return content;
// }

// function cleanTimeInput(e, minute=false) {
//     if (e.value.length > 2) {
//         e.value = e.value.slice(0, 2);
//     }
//     let i = parseInt(e.value);
//     if (i > (minute ? 59 : 24)) {
//         e.value = (minute ? 59 : 24);
//     }

//     if (i < 0) {
//         e.value = 0;
//     }
// }
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

function toggleItemContainer(i) {
    let e = i.parentElement;
    e.ariaLabel = e.ariaLabel == "open" ? "closed" : "open";
}

// #region account related
document.querySelector("#sidebar #user-data > div h4:first-of-type").innerHTML = username;
// #endregion
