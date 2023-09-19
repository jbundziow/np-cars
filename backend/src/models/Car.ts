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

    async addOneCar() {
        await CarModel.create({
            id: this.id,
            brand: this.brand,
            model: this.model,
            registrationNumber: this.registrationNumber,
            isTaken: this.isTaken
        })
    }

    static async fetchAll() {
        return await CarModel.findAll()
    }

    static async fetchOne(id: number) {
        return await CarModel.findOne({ where: { id: id } })
    }
}


export default Car
