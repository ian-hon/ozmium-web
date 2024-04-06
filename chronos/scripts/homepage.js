var userID = fetchCookie('chronos_user_id');
var dateOffset = 0;

var sidebar = document.getElementById("sidebar");
var timer = document.querySelector("#timer #data h3");
var taskTitle = document.querySelector("#timer #data h1");

var library = [];
var current = null;

var container = document.getElementById("list");
var additionContainer = document.getElementById("add");
var additionFields = document.getElementById("fields");

// #region utils
function isCurrent(range) {
    return (range[0] <= getEpochDayTime()) && (getEpochDayTime() <= range[1]);
}

function formatTime(t) {
    // t : time since day start

    // var d = new Date(e * 1000);
    // return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;

    return [
        String(Math.floor(t / 3600)).padStart(2, "0"),
        // TODO:fix (done)
        // not converting properly
        // floating point error probably
        // 80280 -> 8:18
        // 80340 -> 8:18 (supposed to be 8:19)
        String(
            (
                (
                    (t / 3600) - Math.floor(t / 3600)
                ) * 60
            ).toFixed()
            ).padStart(2, "0")
    ];
}

function getEpochUnix() {
    return (new Date().getTime() / 1000).toFixed();
}

function getEpochDayTime(d = null) {
    // seconds elapsed since start of day
    let t = d ? d : new Date();
    return (t.getHours() * 3600) +
    (t.getMinutes() * 60) +
    (t.getSeconds());
}

function getEpochDate(d = null, raw=false) {
    // days since 1 jan 1970
    let now = d ? d : new Date();
    let t = Date.parse(`${now.getUTCMonth() + 1}/${now.getUTCDate()}/${now.getUTCFullYear()} ${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()} GMT-9:00`) / 1000;
    return Math.floor(t / 86400) + (raw ? 0 : dateOffset);
}

function humanToEpochUnix(d) {
    // var temp = new Date();
    // var i = `${temp.getMonth()}/${temp.getDate()}/${temp.getFullYear()} ${d}`;
    // console.log(i);
    // damn american format
    //return (new Date(`${temp.getMonth() + 1}/${temp.getDate()}/${temp.getFullYear()} ${d}`).getTime() / 1000).toFixed();

    return new Date(`1/1/1970 ${d} GMT+0`).getTime() / 1000;
    // 03:30 -> (3 * 3600) + (30 * 60) + 0
    
}

function cleanEditables(content) {
    content = content.replace(new RegExp("<br>", 'g'), '');
    content = content.replace(new RegExp("<div>", 'g'), '\n');
    content = content.replace(new RegExp("</div>", 'g'), '');
    return content;
}

function cleanTimeInput(e, minute=false) {
    if (e.value.length > 2) {
        e.value = e.value.slice(0, 2);
    }
    let i = parseInt(e.value);
    if (i > (minute ? 59 : 24)) {
        e.value = (minute ? 59 : 24);
    }

    if (i < 0) {
        e.value = 0;
    }
}
// #endregion


function refreshList() {
    current = null;
    
    sendRequest(`http://127.0.0.1:8000/fetch_library/${userID}/${getEpochDate()}`, (response) => {
        library = JSON.parse(response);

        appendItems();
    })
}

refreshList();

function appendItems() {
    // adds item to the sidebar
    // return;
    
    container.innerHTML = "";
    // return;

    library.forEach((element) => {
        container.innerHTML += `
<div class="item" aria-label="${(element.completed ? 'completed' : (isCurrent([element.start, element.end]) ? 'current' : ''))}" id="task_${element.id}" data-id="${element.id}">
    <label id="completion">
        <input type="checkbox" onchange="toggleComplete(${element.id})" ${element.completed ? "checked" : ""}>
        <div></div>
    </label>
    <div id="time">
        <div>
            <input id="start" type="number" min="0" max="24" value="${formatTime(element.start)[0]}" onchange="cleanTimeInput(this); updateTask(${element.id});">
            <h5>:</h5>
            <input id="start" type="number" min="0" max="60" value="${formatTime(element.start)[1]}" onchange="cleanTimeInput(this, minute=true); updateTask(${element.id});">
        </div>
        <h6 id="separator">|</h6>
        <div>
            <input id="end" type="number" min="0" max="24" value="${formatTime(element.end)[0]}" onchange="cleanTimeInput(this); updateTask(${element.id});">
            <h5>:</h5>
            <input id="end" type="number" min="0" max="60" value="${formatTime(element.end)[1]}" onchange="cleanTimeInput(this, minute=true); updateTask(${element.id});">
        </div>
    </div>
    <h5 id="title">${element.title}</h5>
    <div id="actions" onclick="deleteTask(${element.id})">
        <img src="/assets/trash.png">
    </div>
</div>
`;
    });

    // TODO:worry about not "unlinking" event listeners?
    // when an element is deleted, should the event listeners be removed?

    document.querySelectorAll("#list .item #title").forEach((element) => {
        addItemEvents(element);
    });
}

function addItemEvents(element, withUpdate=true) {
    // this is here so that the .item in task addition gets the same treatment as those in the list

    // console.log(element.parentElement.id);
    element.addEventListener('mouseover', () => {
        element.setAttribute('contenteditable', true);
    });

    element.addEventListener('blur', () => {
        element.setAttribute('contenteditable', false);
        // console.log("blur");
        if (withUpdate) {
            updateTask(element.parentElement.dataset.id, element.innerHTML);
        }
    })

    element.addEventListener('keypress', (e) => {
        if (e.shiftKey) {
            return;
        }
        if (e.key === "Enter") {
            e.preventDefault();
            if (withUpdate) {
                updateTask(element.parentElement.dataset.id, element.innerHTML);
            }
        }
    })
}

// #region add task related
addItemEvents(document.querySelector("#add .item #title"), withUpdate=false);
document.querySelector("#add .item #title").addEventListener('keypress', (e) => {
    if (e.shiftKey) {
        return;
    }
    if (e.key === "Enter") {
        e.preventDefault();
        addTask();
    }
})

document.querySelector("#add .item #title").addEventListener("blur", (_) => {
    let e = document.querySelector("#add .item #title");
    if (e.innerHTML.trim() == "") {
        e.innerHTML = "some random task";
    }
})
// #endregion

// #region toggle-type functions
function toggleFields() {
    additionContainer.ariaLabel = additionContainer.ariaLabel == "open" ? "closed" : "open";
}

function toggleSidebar() {
    sidebar.ariaLabel = sidebar.ariaLabel == "open" ? "closed" : "open";
}
// #endregion

// #region task-related
function addTask() {
    var title = cleanEditables(document.querySelectorAll("#add .item #title")[0].innerHTML);
    // var start = humanToEpochUnix(document.querySelectorAll("#add .item #time #start")[0].value);
    // var end = humanToEpochUnix(document.querySelectorAll("#add .item #time #end")[0].value);

    if (title.trim() == "") {
        return;
    }

    var temp = document.querySelectorAll(`#add .item #time #start`);
    var start = (temp[0].value * 3600) + (temp[1].value * 60);
    var temp = document.querySelectorAll(`#add .item #time #end`);
    var end = (temp[0].value * 3600) + (temp[1].value * 60);

    // console.log("received");
    // console.log(`http://127.0.0.1:8000/add_task/${userID}/${encodeURI(title)}/${getEpochDate()}/${start}/${end}`);

    sendRequest(`http://127.0.0.1:8000/add_task/${userID}/${encodeURIComponent(title)}/${getEpochDate()}/${start}/${end}`, () => {
        refreshList();
    });
}

function deleteTask(task_id) {
    sendRequest(`http://127.0.0.1:8000/remove_task/${userID}/${task_id}/${getEpochDate()}`, (_) => {
        refreshList();
    });
}

function toggleComplete(task_id) {
    var i = document.getElementById("task_" + task_id);
    i.ariaLabel = i.ariaLabel == "completed" ? "" : "completed";

    sendRequest(`http://127.0.0.1:8000/complete_task/${userID}/${task_id}/${getEpochDate()}/${i.ariaLabel == "completed"}`, (_) => {
        
    });
}

function updateTask(task_id) {
    var updated = cleanEditables(document.querySelectorAll(`#task_${task_id} #title`)[0].innerHTML);
    // if title is empty then delete the task
    if (updated == "") {
        deleteTask(task_id);
        return;
    }
    var temp = document.querySelectorAll(`#task_${task_id} #time #start`);
    var start = (temp[0].value * 3600) + (temp[1].value * 60);
    var temp = document.querySelectorAll(`#task_${task_id} #time #end`);
    var end = (temp[0].value * 3600) + (temp[1].value * 60);

    console.log(start, end);

    sendRequest(`http://127.0.0.1:8000/update_task/${userID}/${task_id}/${getEpochDate()}/${start}/${end}/${encodeURIComponent(updated)}`, (_) => {
        refreshList();
    });
}
// #endregion

// #region date selection
function progressDate(n) {
    dateOffset += n;
    updateDateSelection();
}

function updateDateSelection() {
    let d = new Date(getEpochDate() * 86400 * 1000);
    document.querySelector("#date-select h5").innerHTML = dateOffset == 0 ? 'today' : (
        `${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()]} ${d.getDate()} ${
            ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][d.getMonth()]
        }`
    );

    refreshList();
}
// #endregion

// #region timer
function updateTimerTask() {
    if (!current) {
        library.forEach((element) => {
            if (isCurrent([element.start, element.end])) {
                current = element;
            }
        });
    }

    updateTimer();
}

function updateTimer() {
    // called every second
    if (!current) {
        timer.innerHTML = "";
        taskTitle.innerHTML = "no active tasks 🥳🥳"
        return;
    }

    taskTitle.innerHTML = current.title;

    let t = current.end - getEpochDayTime();
    if (t < 0) {
        current = null;
    }
    // let h = Math.floor(t / 3600);
    // let m = Math.floor(t / 60) - (h * 60);
    // let s = t - (m * 60);

    console.log(t);

    // let h = Math.floor((t - (Math.floor(t / 3600) * 3600)) / 3600);
    // let m = Math.floor((t - (Math.floor(t / 60) * 60)) / 60);
    let h = Math.floor(t / 3600);
    t -= h * 3600;
    let m = Math.floor(t / 60);
    t -= m * 60;
    let s = t;
    // let s = t;

    // let h = String(
    //     Math.floor(t / 3600)
    // ).padStart(2, "0");
    // let m = 
    // String(
    //     (
    //         (
    //             (t / 3600) - Math.floor(t / 3600)
    //         ) * 60
    //     ).toFixed()
    // ).padStart(2, "0");
    // let s = String(
    //     (
    //         (
    //             (t / 3600) - Math.floor(t / 3600)
    //         ) * 60
    //     ).toFixed()
    // ).padStart(2, "0");
    
    timer.innerHTML = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")} remaining`;
}

var timerHandle = setInterval(() => {
    updateTimerTask()
}, 1000);

// #endregion

// #region account related
sendRequest(`http://127.0.0.1:8000/fetch_username/${userID}`, (response) => {
    document.querySelector("#navbar #account h5").innerHTML = response;
})
// #endregion
