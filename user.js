var username = fetchLocalStorage("aurum_username");
var password = fetchLocalStorage("aurum_password");

if ((username === null) || (password === null)) {
    window.location.href = "./login.html";
}

function login_info() {
    return JSON.stringify({
        "username":username,
        "password":password
    });
}