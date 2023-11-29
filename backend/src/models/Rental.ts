const {DataTypes, Op} = require('sequelize');

import sequelize from "../database/database";
import { CarModel } from "./Car";

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
        allowNull: true,
      },
      returnUserID: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      dateFrom: {
        type: DataTypes.DATE,
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
        private userID: number | null,
        private returnUserID: number | null,
        private lastEditedByModeratorOfID: number | null,
        private carMileageBefore: number,
        private carMileageAfter: number | null,
        private travelDestination: string | null,
        private placeID: number | null,
        private dateFrom: Date | null,
        private dateTo: Date | null,
        ) {}

    //by normal user
    async addOneRental() {
      let rentalData;
      try {
        await sequelize.transaction(async (t) => {
          rentalData = await RentalModel.create({
            id: this.id,
            carID: this.carID,
            userID: this.userID,
            returnUserID: this.returnUserID,
            lastEditedByModeratorOfID: this.lastEditedByModeratorOfID,
            carMileageBefore: this.carMileageBefore,
            carMileageAfter: this.carMileageAfter,
            travelDestination: this.travelDestination,
            placeID: this.placeID,
            dateFrom: this.dateFrom,
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
        return rentalData;
      }
        catch (error) {
          console.log(error);
          throw new Error('Error while creating rental and updating car status')
        }
    }

    //by normal user
    static async returnCar(rentalID: number, carID: number, returnUserID: number, carMileageAfter: number, dateTo: Date, travelDestination: string) {
      let rentalData;
      try {
        await sequelize.transaction(async (t) => {
          rentalData = await RentalModel.update({
            returnUserID: returnUserID,
            carMileageAfter: carMileageAfter,
            dateTo: dateTo,
            travelDestination: travelDestination,
          },
          {where: {id: rentalID, carID: carID},
          transaction: t
          })

          const car:any = await CarModel.findByPk(carID, { transaction: t });
          if (car) {
            car.availabilityStatus = 'available';
            await car.save({ transaction: t });
          } else {
            throw new Error('Car not found');
          }
        })
        return rentalData;
      }
        catch (error) {
          throw new Error('Error while updating rental and updating car status')
        }
    }

    static async fetchAll() {
        return await RentalModel.findAll()
    }

    static async fetchOne(id: number) {
        return await RentalModel.findOne({ where: {id: id} })
    }

    static async fetchLastRentalOfCar(carid: number) {
      return await RentalModel.findOne({
        where: {
          carID: carid,
        },
        order: [['id', 'DESC']],
      })
    }



    static async fetchAllRentalsOfUser (userID: number, type: 'all' | 'pending' | 'closed') {
      if (type === 'pending') {
        return await RentalModel.findAll({
          where: {
            userID: userID,
            carMileageAfter: null,
          }
        })
      }
      else if (type === 'closed') { //TODO: maybe add pagination?
        return await RentalModel.findAll({
          where: {
            userID: userID,
            carMileageAfter: {
              [Op.not]: null,
            },
          }
        })
      }
      else {
        return await RentalModel.findAll({
          where: {
            userID: userID, 
          }
        })
      }
    }


}






export default Rental;
