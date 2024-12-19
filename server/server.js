const express = require("express");
const sequelize = require("./db");
const User = require("./models/user");
const Enrollment = require("./models/enrollment");

const app = express();
app.use(express.json());

(async () => {
    try {
        await sequelize.sync();
        console.log("Database sync.");
    }
    catch (error) {
        console.error("Database sync error: ", error);
    }
})();


///TODO: щас проверить модели и бд. Потом вернуться к созданию routes и остальномму.
app.get("/enrollments", async function (req, res) {
    res.status(200).send(await Enrollment.findAll({ raw: true }));
});
app.get("/users", async function (req, res) {
    res.status(200).send(await User.findAll({ raw: true }));
});
app.get("/add", async function (req, res) {
    try {
        User.create({
            username: req.query.name,
            password: 'dadawwadw'
        }).then(
            Enrollment.create({
                date: "11-12-2000",
                "UserId": 1
            })
        );
    }
    catch (error) {
        console.log("ERROR", error);
    }
    res.send("true");
});







app.listen(3000, () => console.log('Server runned with port: 3000.'));