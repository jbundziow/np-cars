const {DataTypes} = require('sequelize');



import sequelize from "../database/database";
const RentalModel = sequelize.define('Rental', {
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
      carMileageBefore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      carMileageAfter: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      travelDestinationAUTO: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      travelDestinationMAN: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateFrom: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dateTo: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      
})



class Rental {
    constructor(
        private id: number | null,
        private carID: number,
        private userID: number,
        pri//TODO: FINISH HERE
        private dateFrom: string,
        private dateTo: string,
        private travelDestination: string
        ) {}

    async addOneRental() {
        await RentalModel.create({
          id: this.id,
          carID: this.carID,
          userID: this.userID,
          ...SS//TODO: FINISH HERE
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
          travelDestination: this.travelDestination,
        })
    }

    static async fetchAll() {
        return await RentalModel.findAll()
    }

    static async fetchOne(id: number) {
        return await RentalModel.findOne({ where: { id: id } })
    }
}



export default Rental;
