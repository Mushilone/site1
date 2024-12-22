async function getEnrollmentsById(id) {
    if (!id) {
        alert("null");
        return;
    }
    const res = await fetch("http://localhost:3000/api/enrollment/" + id,
        {
            method: "GET",
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        });
    const data = await res.json();
    if (res.status != 200) {
        alert(data.message);
        return;
    }
    return data;
}
async function getEnrollments() {
    const res = await fetch("http://localhost:3000/api/enrollment",
        {
            method: "GET",
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        });
    const data = await res.json();
    if (res.status != 200) {
        alert(data.message);
        return;
    }
    return data;
}
// async function updateEnrollment(enrollment) {
//     if (!enrollment) {
//         alert("Enrollment is null!");
//         return;
//     }
//     const res = await fetch("http://localhost:3000/api/enrollment",
//         {
//             method: "PUT",
//             headers:
//             {
//                 "Authorization": "Bearer " + localStorage.getItem("token"),
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ id: enrollment.id, date: enrollment.date })
//         });
//     const data = await res.json();
//     if(res.status != 200){
//         alert(data.message);
//         return;
//     }
//     return data;
// }
async function addEnrollment(enrollment) {
    if (!enrollment) {
        alert("Enrollment is null");
        return;
    }
    const res = await fetch("http://localhost:3000/api/enrollment",
        {
            method: "POST",
            headers:
            {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ date: enrollment.date, UserId: enrollment.userId })
        });
    const data = await res.json();
    if (res.status != 200) {
        alert(data.message);
        return;
    }
    return data;
}
async function deleteEnrollment(id) {
    if (!id) {
        alert("id is null");
        return;
    }
    const res = await fetch("http://localhost:3000/api/enrollment/" + id,
        {
            method: "DELETE",
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        });
    const data = await res.json();
    if (res.status != 200) {
        alert(data.message);
        return;
    }
    return data;
}