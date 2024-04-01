var user_id = fetchCookie('chronos_user_id');

var sidebar = document.getElementById("sidebar");

var library = [
    // [true, [1709298000000, 1709301600000], "Compile mass defect data & calculate product 🔍"],
    // [false, [1709303400000, 1709305200000], "Proofread & edit transcript 📖"],
    // [false, [1709305200000, 1709307600000], "Brainstorm marketing strategies 🧠"]
    {
        task_id: 0,
        completed: true,
        title: "Compile mass defect data & calculate product 🔍",
        start: 1709298000000,
        end: 1709301600000
    },
    {
        task_id: 1,
        completed: false,
        title: "Proofread & edit transcript 📖",
        start: 1709303400000,
        end: 1709305200000
    },
    {
        task_id: 2,
        completed: false,
        title: "Brainstorm marketing strategies 🧠",
        start: 1709305200000,
        end: 1709307600000
    },
];

var container = document.getElementById("list");
var additionContainer = document.getElementById("add");
var additionFields = document.getElementById("fields");

// #region utils
function isCurrent(range) {
    return (range[0] <= getEpochDayTime()) && (getEpochDayTime() <= range[1]);
    // return (range[0] <= getEpochUnix()) && (getEpochUnix() <= range[1]);
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

function getEpochDate(d = null) {
    // days since 1 jan 1970
    return Math.floor(((d ? d : new Date()).getTime() / 1000) / 86400);
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
    sendRequest(`http://127.0.0.1:8000/fetch_library/${user_id}/${getEpochDate()}`, (response) => {
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
`
    });

    // TODO:worry about not "unlinking" event listeners?
    // when an element is deleted, should the event listeners be removed?

    document.querySelectorAll("#list .item #title").forEach((element) => {
        addItemEvents(element);
    });

    // document.querySelectorAll("")

    // document.querySelectorAll(".item ")
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
    console.log(e);
    // console.log(e.)
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

    console.log("received");
    console.log(`http://127.0.0.1:8000/add_task/${user_id}/${encodeURI(title)}/${getEpochDate()}/${start}/${end}`);

    sendRequest(`http://127.0.0.1:8000/add_task/${user_id}/${encodeURI(title)}/${getEpochDate()}/${start}/${end}`, () => {
        refreshList();
    });
}

function deleteTask(task_id) {
    // console.log(`delete : ${task_id}`);
    sendRequest(`http://127.0.0.1:8000/remove_task/${user_id}/${task_id}/${getEpochDate()}`, (_) => {
        // var response = JSON.parse(response)
        refreshList();
    });
}

function toggleComplete(task_id) {
    var i = document.getElementById("task_" + task_id);
    i.ariaLabel = i.ariaLabel == "completed" ? "" : "completed";

    sendRequest(`http://127.0.0.1:8000/complete_task/${user_id}/${task_id}/${getEpochDate()}/${i.ariaLabel == "completed"}`, (_) => {
        
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
    var start = temp[0].value + temp[1].value;
    var temp = document.querySelectorAll(`#task_${task_id} #time #end`);
    var end = temp[0].value + temp[1].value;

    console.log(start, end);

    sendRequest(`http://127.0.0.1:8000/update_task/${user_id}/${task_id}/${getEpochDate()}/${encodeURI(updated)}`, (_) => {
        // continue this
    });
}
// #endregion
