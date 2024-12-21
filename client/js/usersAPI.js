async function getUsersById(id) {
    if (!id) {
        alert("null");
        return;
    }
    if (isNaN(id)) {
        alert("nan value");
        return;
    }
    const res = await fetch("http://localhost:3000/api/user/" + id, {
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
    });
    const data = await res.json();
    return data[0];
}
async function getUsers() {
    const res = await fetch("http://localhost:3000/api/user", {
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
    });
    const data = await res.json();
    return data;
}
async function updateUser(user) {
    if (!user) {
        alert("user update: null value");
        return;
    }
    const res = await fetch("http://localhost:3000/api/user", {
        method: "PUT",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        body: JSON.parse({user})  // ?
    });
    if(res.status != 200){
        alert("user update: invalid status request");
        return;
    }
    const data = res.json();
    return data;
}