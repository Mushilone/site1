const express = require("express");
const sequelize = require("./db");
const User = require("./models/user");

const app = express();
app.use(express.json());

(async() =>{
    try{
        await sequelize.sync();
        console.log("Database sync.");
    }
    catch(error){
        console.error("Database sync error: ", error);
    }
})();







app.listen(3000, () => console.log('Server runned with port: 3000.'));