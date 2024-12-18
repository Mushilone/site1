const {Sequelize} = require("sequelize");
const sequelize = new Sequelize ({dialect: "sqlite", storage: "./db.sqlite"});

(async () =>{
    try{
        await sequelize.authenticate();
        console.log("Database connection success!");
    }
    catch(error){
        console.error('Database connection error: ', error);
    }
})();

module.exports = sequelize;