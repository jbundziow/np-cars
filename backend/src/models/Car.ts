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
      type: {
        type: DataTypes.ENUM('passengerCar', 'bus', 'truck'),
        allowNull: false,
      },
      imgPath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      plateNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hasFuelCard: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      fuelCardPIN: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fuelType: {
        type: DataTypes.ENUM('diesel', 'petrol', 'lpg', 'hybrid'),
        allowNull: false,
      },
      tankCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      loadCapacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      nextInspectionDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nextInsuranceDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      availabilityStatus: {
        type: DataTypes.ENUM('onService', 'damaged', 'other'),
        allowNull: true,
      },
      availabilityDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
})



class Car {
    constructor(
        private id: number | null,
        private brand: string,
        private model: string,
        private type: 'passengerCar' | 'bus' | 'truck',
        private imgPath: string,
        private plateNumber: string,
        private hasFuelCard: boolean,
        private fuelCardPIN: number,
        private fuelType: 'diesel' | 'petrol' | 'lpg' | 'hybrid',
        private tankCapacity: number, //liters
        private loadCapacity: number, //kilograms
        private nextInspectionDate: string,
        private nextInsuranceDate: string,
        private isAvailable: boolean,
        private availabilityStatus: 'onService' | 'damaged' | 'other' | null,
        private availabilityDescription: string | null,
        ) {}

    async addOneCar() {
        await CarModel.create({
          id: this.id,
          brand: this.brand,
          model: this.model,
          type: this.type,
          imgPath: this.imgPath,
          plateNumber: this.plateNumber,
          hasFuelCard: this.hasFuelCard,
          fuelCardPIN: this.fuelCardPIN,
          fuelType: this.fuelType,
          tankCapacity: this.tankCapacity,
          loadCapacity: this.loadCapacity,
          nextInspectionDate: this.nextInspectionDate,
          nextInsuranceDate: this.nextInsuranceDate,
          isAvailable: this.isAvailable,
          availabilityStatus: this.availabilityStatus,
          availabilityDescription: this.availabilityDescription,
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
