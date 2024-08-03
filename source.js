// const BACKEND_ADDRESS = 'http://www.ozmium.xyz';
// const BACKEND_ADDRESS = 'https://3.106.177.190:8000';

const AURUM_BACKEND_ADDRESS = 'http://127.0.0.1:8000';
// const BACKEND_ADDRESS = 'https://ozmium.xyz/backend';

const CHRONOS_BACKEND_ADDRESS = 'http://127.0.0.1:8001';
const ATHENA_BACKEND_ADDRESS = 'http://127.0.0.1:8002';

const SOTERIUS = 'http://127.0.0.1:8100';
// const SOTERIUS = 'https://ozmium.xyz/soterius_backend';
// uri rewriting in place

async function sendGetRequest(url, func) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if ((this.readyState == 4) && (this.status == 200)) {
            func(this.responseText);
        }
    }

    http.open("GET", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send();
}

async function sendPostRequest(url, body, func) {
    var http = new XMLHttpRequest();
    http.onload = function() {
        if ((this.readyState == 4) && (this.status == 200)) {
            func(this.responseText);
        }
    }

    http.open("POST", url, true);
    // http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("Content-Type", "text/plain");
    // using text/plain overcomes needing to send a OPTION request as a preflight request (preflight request sent automatically to check if actual request is safe to send)
    http.send(body)
}

function parseResponse(r) {
    let result = JSON.parse(r);
    if (result['type'] != "success") {
        window.location.href = `/soterius/login.html?redirect=${encodeURIComponent(window.location)}`;
        // or some kind of proper error handling
    }

    return decodeURIComponent(result['data']);
}


function fetchCookie(name) {
    var result = undefined;
    document.cookie.split(';').forEach(element => {
        let x = element.trim().split("=");
        if (x[0] == name) {
            result = x[x.length - 1];
        }
    });
    return result;
}

function fetchLocalStorage(key) {
    let result = localStorage.getItem(key);
    if (result === null) {
        return null;
    }

    result = JSON.parse(result);
    let d = result["expiry"];
    let current = getEpochUnixGMT();

    if (d > current) {
        // console.log(getEpochUnixGMT());
        localStorage.setItem(key, JSON.stringify({
            "data": result["data"],
            "expiry": getEpochUnixGMT() + (14 * 86400)
        }));
        // 14 days till expiry
        return result["data"];
    }

    localStorage.removeItem(key);
    return null;
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify({
        "data": value,
        "expiry": getEpochUnixGMT() + (14 * 86400)
    }));
}

function getEpochUnixLocal(millis=false) {
    // get epoch unix at local
    let t = new Date();
    let f = t.getTime() - t.getTimezoneOffset();
    return Math.floor(f / (millis ? 0 : 1000));
}

function getEpochUnixGMT(millis=false) {
    // get epoch unix at gmt
    // 0 (GMT)  3600 (GMT+01:00)    7200 (GMT+02:00)

    return Math.floor((new Date()).getTime() / (millis ? 0 : 1000));
    // apparently thats it?
}

function clampValue(i, min, max) {
    return Math.max(Math.min(i, max), min);
}

function formatDateTime(d) {
    // 23/5/24 19:15 GMT+8
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit',

        minute: '2-digit',
        hour: 'numeric',
        hour12: false,

        timeZoneName: 'short'
    }).format(d)
}
