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
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    });
    const data = await res.json();
    return data;
}
async function getUsers(){
    const res = await fetch("http://localhost:3000/api/user", {
        method: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    });
    const data = await res.json();
    return data;
}