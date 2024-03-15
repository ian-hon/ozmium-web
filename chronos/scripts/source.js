var library = [
    [false, [1709298000000, 1709301600000], "Compile notes and find out what to do 🔍"],
    [false, [1709303400000, 1709305200000], "Start memorizing the little stuff 🧠"],
    [false, [1709305200000, 1709307600000], "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quod deleniti dolor eius unde ratione, dolore dolorem consequatur provident esse sapiente. Molestias quo porro praesentium architecto nam modi commodi repellendus!"]
];

var container = document.getElementById("list");
var additionContainer = document.getElementById("add");
var additionFields = document.getElementById("fields");

function isCurrent(range) {
    return (range[0] <= new Date().getTime()) && (new Date().getTime() <= range[1]);
}

function formatTime(e) {
    var d = new Date(e);
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function appendItems() {
    container.innerHTML = "";

    library.forEach((element) => {
        container.innerHTML += `
<div class="item" aria-label="${(element[0] ? 'completed' : (isCurrent(element[1]) ? 'current' : ''))}">
    <div id="time">
        <input id="start" type="text" value="${formatTime(element[1][0])}">
        <h6 id="separator">|</h6>
        <input id="end" type="text" value="${formatTime(element[1][1])}">
    </div>
    <h5 id="title">${element[2]}</h5>
</div>
`
    });

    document.querySelectorAll(".item #title").forEach((element) => {
        element.addEventListener('mouseover', () => {
            element.setAttribute('contenteditable', true);
        });

        element.addEventListener('blur', () => {
            element.setAttribute('contenteditable', false);
        });
    });
}

function toggleFields() {
    additionContainer.ariaLabel = additionContainer.ariaLabel == "open" ? "closed" : "open";
    updateInputBox();
}

appendItems();

requestAnimationFrame(() => console.log("test"));

function updateInputBox() {
    
    var container = document.querySelector("#add");
    var i = document.querySelector('#add #fields');
    if (container.ariaLabel == "open") {
        i.style.maxHeight = '';
        i.style.maxHeight = i.scrollHeight + 'px';
    } else {
        i.style.maxHeight = 0;
    }
    console.log(i);

    var nestedContainer = document.querySelector("#add #fields .item #title");
    // if (nestedContainer === document.activeElement) {
    //     i.style.transitionDuration = '0s';
    // } else {
    //     i.style.transitionDuration = '0.3s';
    // }
    console.log(i.style.transitionDuration);
    console.log(nestedContainer === document.activeElement);

    // this.style.maxHeight = '';this.style.maxHeight = this.scrollHeight + 'px';
}
