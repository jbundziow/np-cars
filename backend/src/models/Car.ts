const {DataTypes} = require('sequelize');



import sequelize from "../database/database";
const CarModel = sequelize.define('Car', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registrationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isTaken: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
})





class Car {
    static async showAllCars() {
        const allCars = await CarModel.findAll()
        return allCars;
    }
}


export default Car
