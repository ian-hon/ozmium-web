let languages = document.querySelector("#languages > table");
let last_updated = document.querySelector("#languages #description a");
// <tr><th>c#</th><th>374 hours</th></tr>

let response;
fetch('./py_backend/data.json')
.then(async (e) => {
    response = (await e.json());

    languages.innerHTML = '';
    response['data'].forEach((l) => {
        languages.innerHTML += `<tr><th>${l[0]}</th><th>${l[1]}</th></tr>`;
    });

    let t = new Date(response['time'] * 1000);
    last_updated.innerHTML = `last updated on ${t.getDate()} ${['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][t.getMonth()]}`;
})
