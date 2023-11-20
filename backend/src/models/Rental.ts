const {DataTypes} = require('sequelize');

import sequelize from "../database/database";
import Car, { CarModel } from "./Car";

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
      travelDestination: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      placeID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dateTo: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      
})


// const syncModel = async () => {
//   await RentalModel.sync({ force: true });
// }
// syncModel();


class Rental {
    constructor(
        private id: number | null,
        private carID: number,
        private userID: number,
        private lastEditedByModeratorOfID: number | null,
        private carMileageBefore: number,
        private carMileageAfter: number | null,
        private travelDestination: string | null,
        private placeID: number | null,
        private dateTo: Date | null,
        ) {}

    async addOneRental() {
      try {
        return await sequelize.transaction(async (t) => {
          await RentalModel.create({
            id: this.id,
            carID: this.carID,
            userID: this.userID,
            lastEditedByModeratorOfID: this.lastEditedByModeratorOfID,
            carMileageBefore: this.carMileageBefore,
            carMileageAfter: this.carMileageAfter,
            travelDestination: this.travelDestination,
            placeID: this.placeID,
            dateTo: this.dateTo,
          }, { transaction: t })

          const car:any = await CarModel.findByPk(this.carID, { transaction: t });
          if (car) {
            car.availabilityStatus = 'rented';
            await car.save({ transaction: t });
          } else {
            throw new Error('Car not found');
          }
        })
      }
        catch (error) {
          console.error('Error creating rental and updating car status:', error);
        }
    }

    static async fetchAll() {
        return await RentalModel.findAll()
    }

    static async fetchOne(id: number) {
        return await RentalModel.findOne({ where: {id: id} })
    }
}



export default Rental;
