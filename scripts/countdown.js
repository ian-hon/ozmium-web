var collection = [
    [1701738900, "Physics amali"],
    [1701825300, "Chemistry amali"],

    [1704671400, "BM oral"],
    [1705449000, "English oral"],

    [1706487300, "BM English listening"],
    [1706573700, "BM"],
    [1706660100, "English"],
    [1707092100, "Sejarah"],
    [1707178500, "Maths"],
    [1707264900, "P. Moral"],
    [1708301700, "Physics"],
    [1708474500, "A. Maths"],
    [1708906500, "Chemistry"],
    [1709169300, "Biology"],
    [1709684100, "Sains Komputer"]
];

var p = document.getElementById("timetable");
collection.forEach((e) => {
    let d = new Date(e[0] * 1000);
    e.push(`${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()]} ${d.getDate()} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()]}`);

    let o = document.createElement("h2");
    p.appendChild(o);
    e.push(o);
})


function updateAllText() {
    collection.forEach((e) => {
        updateText(e[0], e[1], e[2], e[3]);
    })
}

function updateText(target, title, date, obj) {
    var length = parseInt(target - (new Date().getTime() / 1000));

    let d = parseInt(length / 86400);
    let h = parseInt((length % 86400) / 3600);
    let m = parseInt((length % 3600) / 60);
    let s = length % 60;

    let w = parseInt(d / 7);
    let d_ = d % 7;

    let t = "";
    let flag = true;
    for (const e of [[d, 'd'], [h, 'h'], [m, 'm'], [s, 's']]) {
        if ((e[0] == 0) && flag) {
            continue;
        }
        flag = false;
        t += `${e[0]}${e[1]} `;
    }
    // property of han_yuji_

    if (length > 0) {
        if (d <= 0) {
            obj.innerHTML = `<div><b>${title}</b> in ${h}h</div>`;
        } else {
            obj.innerHTML = `<div><b>${title}</b> in ${d}d</div>`;
        }
    } else {
        obj.innerHTML = `<div id='completed'><b>${title}</b> ${Math.abs(d)}d ago</div>`;
    }
    obj.innerHTML += `<h5>${t}; ${date}</h5>`;
}

updateAllText();
setInterval(updateAllText, 1000);
