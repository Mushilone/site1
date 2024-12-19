const {DataTypes} = require("sequelize");
const sequelize = require("../db");

const Enrollment = sequelize.define("Enrollment", {
    id: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    date: {type:DataTypes.DATE, allowNull:false}
});

module.exports = Enrollment;