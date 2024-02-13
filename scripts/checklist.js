var container = document.getElementById("checklist");
var key = container.ariaLabel;

var data = '';


fetch(`../checklist/checklist_data/${key}.json`)
    .then((response) => response.text())
    .then((n) => {
        container.innerHTML = "";
        data = JSON.parse(n);
        populateList(data);
    });

function populateList(data) {
    data.forEach((e, i) => {
        container.innerHTML += `
<div>
    <input type="checkbox" id="item${i}" name="item${i}" ${e[1] ? "checked" : ""} onclick="updateSelection(${i})">
    <label for="item${i}">${e[0]}</label>
</div>
        `;
    })
}

function updateSelection(item) {
    data[item][1] = !(data[item][1]);

    saveData();
}

function saveData() {
    let d = encodeURIComponent(JSON.stringify(data));
    console.log(JSON.stringify(data));

    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            console.log("success");
        }
    }
    req.open("GET", `http://104.21.86.185:8000/save/${key}/${d}`, true);
    req.send(null);
}

