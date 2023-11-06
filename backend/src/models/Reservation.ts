const {DataTypes, Op} = require('sequelize');



import { AnySchema } from "joi";
import sequelize from "../database/database";
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

    static async test (desiredDate: Date) {
      return await ReservationModel.findAll({
        where: {
          [Op.and]: [
            { DateFrom: { [Op.lte]: desiredDate } },
            { DateTo: { [Op.gte]: desiredDate } },
          ],
        },
      });
    }
    
}



export default Reservation;
