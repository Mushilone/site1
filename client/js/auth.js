async function register() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const message = document.getElementById("message");
    if (!username.value || !password.value) {
        message.innerText = "Username or password is empty!";
        return;
    }
    const res = await fetch("http://localhost:3000/api/user/register",
        {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ username: username.value, password: password.value })
        }
    );
    const data = await res.json();
    if (res.status != 200) {
        message.innerText = data.message;
        return;
    }
    localStorage.setItem("token", data.token);
    window.location.replace("../index.html");
}
async function login() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const message = document.getElementById("message");
    if (!username.value || !password.value) {
        message.innerText = "Username or password is empty!";
        return;
    }
    const res = await fetch("http://localhost:3000/api/user/login",
        {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ username: username.value, password: password.value })
        }
    );
    const data = await res.json();
    if (res.status != 200) {
        message.innerText = data.message;
        return;
    }
    localStorage.setItem("token", data.token);
    window.location.replace("../index.html");
}
async function check() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/api/user/auth", {
        method: "GET",
        headers: { 'Authorization': "Bearer " + token }
    });
    if (res.status == 403) {
        return false;
    }
    const data = await res.json();
    localStorage.setItem("userId", data.id);
    return true;
}
async function checkPassword(oldPassword) {
    const message = document.getElementById("message");
    if (!oldPassword) {
        message.innerText = "Old password is null!";
        return false;
    }
    const res = await fetch("http://localhost:3000/api/user/password", {
        method: "POST",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token"),
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ oldPassword })
    });
    const data = await res.json();
    if (res.status != 200) {
        message.innerText = "Invalid old password!";
        return false;
    }
    return true;
}

function logout() {
    localStorage.clear();
    window.location.replace("../log.form/log.html");
}