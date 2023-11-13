const {DataTypes, Op} = require('sequelize');


import sequelize from "../database/database";
import { getFormattedDate } from "../utilities/functions/getFormattedDate";
const ReservationModel = sequelize.define('Reservation', {
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
      dateFrom: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dateTo: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      travelDestination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
})


// const syncModel = async () => {
//   await ReservationModel.sync({ force: true });
// }
// syncModel();


class Reservation {
    constructor(
        private id: number | null,
        private carID: number,
        private userID: number,
        private lastEditedByModeratorOfID: number | null,
        private dateFrom: Date,
        private dateTo: Date,
        private travelDestination: string
        ) {}

    async addOneReservation() {
        await ReservationModel.create({
          id: this.id,
          carID: this.carID,
          userID: this.userID,
          lastEditedByModeratorOfID: this.lastEditedByModeratorOfID,
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
          travelDestination: this.travelDestination,
        })
    }

    static async fetchAll() {
        return await ReservationModel.findAll()
    }

    static async fetchOne(id: number) {
        return await ReservationModel.findOne({ where: { id: id } })
    }

    static async checkReservationAtDesiredDay (carID: number, date: Date) {
      return await ReservationModel.findOne({
        where: {
          [Op.and]: [
            { DateFrom: { [Op.lte]: date } },
            { DateTo: { [Op.gte]: date } },
            { carID: carID }
          ],
        },
      });
    }

    static async checkReservationsBetweenDates (carID: number, dateFrom: Date, dateTo: Date) {
      return await ReservationModel.findAll({
        where: {
          [Op.and]: [
            { DateFrom: { [Op.lte]: dateTo } },
            { DateTo: { [Op.gte]: dateFrom } },
            { carID: carID }
          ],
        },
      });
    }

    static async fetchAllReservationsOfUser (userID: number, time: 'past' | 'all' | 'future') {

      if (time === 'past') {
        return await ReservationModel.findAll({
          where: {
            [Op.and]: [
              { DateFrom: { [Op.lt]: getFormattedDate(new Date()) } },
              { userID: userID }
            ],
          },
          order: [['DateFrom', 'DESC']],
        });
      }
      else if (time === 'future') {
        return await ReservationModel.findAll({
          where: {
            [Op.and]: [
              { DateFrom: { [Op.gte]: getFormattedDate(new Date()) } },
              { userID: userID }
            ],
          },
          order: [['DateFrom', 'ASC']],
        });
      }
      else {
        return await ReservationModel.findAll({
          where: {userID: userID}
        });
      }
    }

    static async fetchAllReservationsOfCar (carID: number, time: 'past' | 'all' | 'future') {
   
    if (time === 'past') {
      return await ReservationModel.findAll({
        where: {
          [Op.and]: [
            { DateFrom: { [Op.lt]: getFormattedDate(new Date()) } },
            { carID: carID }
          ],
        },
        order: [['DateFrom', 'DESC']],
      });
    }
    else if (time === 'future') {
      return await ReservationModel.findAll({
        where: {
          [Op.and]: [
            { DateFrom: { [Op.gte]: getFormattedDate(new Date()) } },
            { carID: carID }
          ],
        },
        order: [['DateFrom', 'ASC']],
      });
    }
    else {
      return await ReservationModel.findAll({
        where: {carID: carID}
      });
    }
    }
    
}



export default Reservation;
