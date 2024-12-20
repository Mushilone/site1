require("dotenv").config({path: __dirname+"/.env"});
const express = require("express");
const sequelize = require("./db");
const User = require("./models/user");
const Enrollment = require("./models/enrollment");
const apiRouter = require("./routes/index");
const errorHandler = require("./middlewares/errorHandlingMiddleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");



const app = express();
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api", apiRouter);
app.use(errorHandler);

(async () => {
    try {
        await sequelize.sync();
        console.log("Database sync.");
    }
    catch (error) {
        console.error("Database sync error: ", error);
    }
})();










app.listen(3000, () => console.log('Server runned with port: 3000.'));