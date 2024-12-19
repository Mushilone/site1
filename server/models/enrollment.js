const {DataTypes} = require("sequelize");
const sequelize = require("../db");
// const User = require("./user");

const Enrollment = sequelize.define("Enrollment", {
    id: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    date: {type:DataTypes.DATE, allowNull:false}
});

module.exports = Enrollment;