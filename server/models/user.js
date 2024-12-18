const {DataTypes} = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define('User', {
    id:{ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name:{type:DataTypes.STRING, allowNull:false},
    surname:{type: DataTypes.STRING, allowNull:true},
    username:{type: DataTypes.STRING, allowNull:false},
    password:{type:DataTypes.STRING, allowNull: false},
    
});

module.exports = User;