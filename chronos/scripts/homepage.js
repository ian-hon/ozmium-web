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

function isCurrent(range) {
    return (range[0] <= getEpochUnix()) && (getEpochUnix() <= range[1]);
}

function formatTime(e) {
    var d = new Date(e * 1000);
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function getEpochUnix() {
    return (new Date().getTime() / 1000).toFixed();
}

function humanToEpochUnix(d) {
    var temp = new Date();
    // var i = `${temp.getMonth()}/${temp.getDate()}/${temp.getFullYear()} ${d}`;
    // console.log(i);
    // damn american format
    return (new Date(`${temp.getMonth() + 1}/${temp.getDate()}/${temp.getFullYear()} ${d}`).getTime() / 1000).toFixed();
}

function cleanEditables(content) {
    content = content.replace(new RegExp("<br>", 'g'), '');
    content = content.replace(new RegExp("<div>", 'g'), '\n');
    content = content.replace(new RegExp("</div>", 'g'), '');
    return content;
}

function refreshList() {
    sendRequest(`http://127.0.0.1:8000/fetch_library/${user_id}/${getEpochUnix()}`, (response) => {
        library = JSON.parse(response);

        appendItems();
    })
}

refreshList();

function appendItems() {
    // adds item to the sidebar
    // return;
    
    container.innerHTML = "";

    library.forEach((element) => {
        container.innerHTML += `
<div class="item" aria-label="${(element.completed ? 'completed' : (isCurrent([element.start, element.end]) ? 'current' : ''))}" id="task_${element.id}" data-id="${element.id}">
    <label id="completion">
        <input type="checkbox" onchange="toggleComplete(${element.id})" ${element.completed ? "checked" : ""}>
        <div></div>
    </label>
    <div id="time">
        <input id="start" type="text" value="${formatTime(element.start)}">
        <h6 id="separator">|</h6>
        <input id="end" type="text" value="${formatTime(element.end)}">
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

    document.querySelectorAll(".item #title").forEach((element) => {
        // console.log(element.parentElement.id);
        element.addEventListener('mouseover', () => {
            element.setAttribute('contenteditable', true);
        });

        element.addEventListener('blur', () => {
            element.setAttribute('contenteditable', false);
            // console.log("blur");
            updateTask(element.parentElement.dataset.id, element.innerHTML);
        });
    });
}

function toggleFields() {
    additionContainer.ariaLabel = additionContainer.ariaLabel == "open" ? "closed" : "open";
}

function toggleSidebar() {
    sidebar.ariaLabel = sidebar.ariaLabel == "open" ? "closed" : "open";
}



function addTask() {
    var title = cleanEditables(document.querySelectorAll("#add .item #title")[0].innerHTML);
    var start = humanToEpochUnix(document.querySelectorAll("#add .item #time #start")[0].value);
    var end = humanToEpochUnix(document.querySelectorAll("#add .item #time #end")[0].value);
    console.log("received");

    sendRequest(`http://127.0.0.1:8000/add_task/${user_id}/${encodeURI(title)}/${start}/${end}`, () => {
        refreshList();
    });
}

function deleteTask(task_id) {
    // console.log(`delete : ${task_id}`);
    sendRequest(`http://127.0.0.1:8000/remove_task/${user_id}/${task_id}/${getEpochUnix()}`, (_) => {
        // var response = JSON.parse(response)
        refreshList();
    });
}

function toggleComplete(task_id) {
    var i = document.getElementById("task_" + task_id);
    i.ariaLabel = i.ariaLabel == "completed" ? "" : "completed";

    sendRequest(`http://127.0.0.1:8000/complete_task/${user_id}/${task_id}/${getEpochUnix()}/${i.ariaLabel == "completed"}`, (_) => {
        
    });
}

function updateTask(task_id, content) {
    var updated = cleanEditables(content);


    sendRequest(`http://127.0.0.1:8000/update_task/${user_id}/${task_id}/${getEpochUnix()}/${encodeURI(updated)}`, (_) => {

    });
}
