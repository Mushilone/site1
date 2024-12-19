const {DataTypes} = require("sequelize");
const sequelize = require("../db");
const Enrollment = require("./enrollment");

const User = sequelize.define('User', {
    id:{ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name:{type:DataTypes.STRING, allowNull:true},
    surname:{type: DataTypes.STRING, allowNull:true},
    username:{type: DataTypes.STRING, allowNull:false, unique:true},
    password:{type:DataTypes.STRING, allowNull: false},
});
User.hasMany(Enrollment, {onDelete: "cascade", onUpdate: "cascade"});

module.exports = User;