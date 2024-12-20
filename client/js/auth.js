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
            // headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ username: username.value, password: password.value })
        }
    );
    const data = await res.json();
    if (res.status != 200) {
        message.innerText = data.message;
        return;
    }
    window.location.replace("../index.html");
}
async function login(){
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
            credentials: "include",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ username: username.value, password: password.value })
        }
    );
    const data = await res.json();
    if (res.status != 200) {
        message.innerText = data.message;
        return;
    }
    const usRes = await fetch("http://localhost:3000/api/user", {method: "GET"});
    const users = usRes.json();
    users.forEach((us) => alert(us.username));
    // window.location.replace("../index.html");
}


///TODO: localStorage посмотреть что это и начать делать.
async function check(){
    const res = await fetch("http://localhost:3000/api/user/auth", {
        method: "GET",
        credentials: "include"
        // headers:{
        //     "Cookie": "jwt" + token
        // }
        // credentials: "include"
    });
    const data = res.json();
    alert(data.message);
    // const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    // alert(token);
}