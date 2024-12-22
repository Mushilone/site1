async function getUsersById(id) {
    if (!id) {
        return;
    }
    if (isNaN(id)) {
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
        return;
    }
    const res = await fetch("http://localhost:3000/api/user", {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            id: user.id,
            name: user.name,
            surname: user.surname,
            username: user.username,
            password: user.password
        })
    });
    if (res.status != 200) {
        return;
    }
    const data = await res.json();
    return data;
}