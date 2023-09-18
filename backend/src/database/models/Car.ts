const {Sequelize, DataTypes} = require('sequelize');

// const sequelize = require('../database')
import sequelize from "../database";

const Car = sequelize.define('Car', {

    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        // notNull: true,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    brand: {
        type: DataTypes.STRING,
        // notNull: true,
    },
    model: {
        type: DataTypes.STRING,
        // notNull: true,
    },
    registrationNumber: {
        type: DataTypes.STRING,
        // notNull: true,
    },
    isTaken: {
        type: DataTypes.BOOLEAN,
        // notNull: true, 
    }

})

console.log(Car);
// Car.findAll();


module.exports = Car;