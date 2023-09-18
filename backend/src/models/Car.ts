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

    constructor(private id: number | null, private brand: string, private model: string, private registrationNumber: string, private isTaken: boolean ) {}

    async addCar() {
        await CarModel.create({
            id: this.id,
            brand: this.brand,
            model: this.model,
            registrationNumber: this.registrationNumber,
            isTaken: this.isTaken

        })
    }

    static async showAllCars() {
        const allCars = await CarModel.findAll()
        return allCars;
    }
}


export default Car
