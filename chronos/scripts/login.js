var container = document.getElementById("container");

var buttonText = document.getElementById("proceed");
var toggleText = document.getElementById("modeToggle");

function toggleMode() {
    container.ariaLabel = container.ariaLabel == "login" ? "sign-up" : "login";

    buttonText.innerHTML = container.ariaLabel == "login" ? "login" : "sign up";
    toggleText.innerHTML = container.ariaLabel == "login" ? "dont have an account? sign up" : "have an account? login";
}

toggleMode();

document.querySelectorAll("#container input").forEach((element) => {
    element.addEventListener("keypress", (event) => {
        if (event.key == "Enter") {
            event.preventDefault();
            confirm();
        }
    })
});

async function confirm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm-password").value;

    var result = document.getElementById("error");

    if ((!username) || (!password)) {
        result.innerHTML = "fill in all required data";
        return;
    }

    if ((container.ariaLabel != "login") && (password != confirm_password)) {
        result.innerHTML = "passwords do not match";
        return;
    }

    sendRequest(`http://127.0.0.1:8000/` + (container.ariaLabel == "login" ? "login" : "sign_up") + `/${username}/${password}`, (r) => {
        var response = JSON.parse(r);

        if (response.type == "Success") {
            let now = new Date();
            (now.setTime(now.getTime() + (14 * 86400000)));
            console.log(fetchCookie("chronos_user_id"));
            console.log(response.user_id);
            document.cookie = `chronos_user_id=${response.user_id}; expires=${now.toUTCString()}; path=/`;
            console.log(fetchCookie("chronos_user_id"));

            window.location.href = "./index.html";
        }

        result.innerHTML = {
            "UsernameNoExist": "username doesnt exist",
            "PasswordWrong": "password is incorrect",
            "UserIDNoExist": "username doesnt exist",
            "Success": "",

            "UsernameTaken": "username is already taken"
        }[response.type];
    })
}
