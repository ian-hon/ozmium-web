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

function formatUserCode(code) {
    return `#${code.slice(0, 4)}-${code.slice(4, 8)}`;
}
