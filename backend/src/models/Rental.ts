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
        allowNull: true,
      },
      travelDestinationMAN: {
        type: DataTypes.STRING,
        allowNull: true,
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
        private lastEditedByModeratorOfID: number | null,
        private carMileageBefore: number,
        private carMileageAfter: number | null,
        private travelDestinationAUTO: string | null,
        private travelDestinationMAN: string | null,
        private dateTo: string | null,
        ) {}

    async addOneRental() {
        await RentalModel.create({
          id: this.id,
          carID: this.carID,
          userID: this.userID,
          lastEditedByModeratorOfID: this.lastEditedByModeratorOfID,
          carMileageBefore: this.carMileageBefore,
          carMileageAfter: this.carMileageAfter,
          travelDestinationAUTO: this.travelDestinationAUTO,
          travelDestinationMAN: this.travelDestinationMAN,
          dateTo: this.dateTo,
        })
    }

    static async fetchAll() {
        return await RentalModel.findAll()
    }

    static async fetchOne(id: number) {
        return await RentalModel.findOne({ where: {id: id} })
    }
}



export default Rental;
