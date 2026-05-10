var collection = [
    // [1701738900, "Physics amali"],
    // [1701825300, "Chemistry amali"],

    // [1704671400, "BM oral"],
    // [1705449000, "English oral"],

    // [1706487300, "BM English listening"],
    // [1706573700, "BM"],
    // [1706660100, "English"],
    // [1707092100, "Sejarah"],
    // [1707178500, "Maths"],
    // [1707264900, "P. Moral"],
    // [1708301700, "Physics"],
    // [1708474500, "A. Maths"],
    // [1708906500, "Chemistry"],
    // [1709169300, "Biology"],
    // [1709684100, "Sains Komputer"],

    // [1716775200, "SPM Results"]

    // [1733796000, "DTIN final exam"],
    // [1733968800, "Math final exam"],
    // [1734400800, "CA final exam"]

    // [1742443140, "ISCC P1"],
    // [1742443140, "ISCC P2"],
    // [1741147140, "DBM P1"],
    // [1743911940, "DBM P2"],
    // [1744516620, "OPS P1"],
    // [1745121420, "OPS P2"],
    // [1744171140, "PWP P1"]

    /*
CSF Section 1 25 -- 31 May (Week 10) 
NWT Practical 27th May
CSF Section 2 8 -- 14 Jun (Week 12)
CSF Presentation 15-- 28 Jun (Week 13 & 14)
IAI 20 Jun
    */

    [1779638400, "CSF Section 1"],
    [1779811200, "NWT Practical"],
    [1780848000, "CSF Section 2"],
    [1781452800, "CSF Presentation"],
    [1781884800, "IAI"]
];

collection = collection.sort((a, b) => a[0] - b[0]);

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
