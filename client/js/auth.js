async function register() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const message = document.getElementById("message");
    if (!username.value || !password.value) {
        message.innerText = "Username or password is empty!";
        alert(username.value + " " + password.value);
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
    window.location.replace("../brand/brand.html");
}