const {DataTypes} = require('sequelize');



import sequelize from "../database/database";
const RefuelingModel = sequelize.define('Refueling', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      carID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lastEditedByModeratorOfID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      carMileage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numberOfLiters: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      costBrutto: {
        type: DataTypes.REAL,
        allowNull: true,
      },
      isFuelCardUsed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },


})



class Refueling {
    constructor(
        private id: number | null,
        private carID: number,
        private userID: number,
        private lastEditedByModeratorOfID: number | null,
        private carMileage: number,
        private numberOfLiters: number,
        private costBrutto: number | null,
        private isFuelCardUsed: boolean,
        ) {}

    async addOneRefueling() {
        await RefuelingModel.create({
          id: this.id,
          carID: this.carID,
          userID: this.userID,
          lastEditedByModeratorOfID: this.lastEditedByModeratorOfID,
          carMileage: this.carMileage,
          numberOfLiters: this.numberOfLiters,
          costBrutto: this.costBrutto,
          isFuelCardUsed: this.isFuelCardUsed,
        })
    }

    static async fetchAll() {
        return await RefuelingModel.findAll()
    }

    static async fetchOne(id: number) {
        return await RefuelingModel.findOne({ where: { id: id } })
    }
}



export default Refueling;