var username = fetchLocalStorage("username");
var password = fetchLocalStorage("password");

if ((username === null) || (password === null)) {
    // window.location.href = "/soterius/login.html";
    window.location.href = `/soterius/login.html?redirect=${window.location}`;
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
