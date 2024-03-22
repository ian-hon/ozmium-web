async function sendRequest(url, func) {
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