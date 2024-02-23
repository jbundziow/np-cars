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

    static async deleteReservation(id: number) {
      const reservation = await Reservation.fetchOne(id);

      if (reservation) {
        return await reservation.destroy();
      }
      else {
        throw new Error('Reservation not found');
      }
  
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
            { DateTo: { [Op.lt]: getFormattedDate(new Date()) } },
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
            { DateTo: { [Op.gte]: getFormattedDate(new Date()) } },
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




    
    static async fetchAllReservationsWithFilters (filters:any, pageSize: number, pageNumber: number) {
      const whereClause: any = {};

      //arrays
      if (filters.carIDs && filters.carIDs.length > 0) {
        whereClause.carID = { [Op.in]: filters.carIDs };
      }
      if (filters.userIDs && filters.userIDs.length > 0) {
        whereClause.userID = { [Op.in]: filters.userIDs };
      }
      if (filters.moderatorIDs && filters.moderatorIDs.length > 0) {
        whereClause.lastEditedByModeratorOfID = { [Op.in]: filters.moderatorIDs };
      }


      //booleans
      if (filters.wasEditedByModerator !== undefined && typeof filters.wasEditedByModerator === 'boolean') {
        if (filters.wasEditedByModerator) {
          whereClause.lastEditedByModeratorOfID = { [Op.ne]: null }; //true
        } else {
          whereClause.lastEditedByModeratorOfID = { [Op.eq]: null }; //false
        }
      }


      //strings (case-insensitive search)
      if(filters.travelDestination) {
        whereClause.travelDestination = { [Op.and]: [
          sequelize.where(sequelize.fn('LOWER', sequelize.col('travelDestination')), 'LIKE', `%${filters.travelDestination.toLowerCase()}%`)
        ] };
      }


      if (filters.reservationDatesRange_from && filters.reservationDatesRange_to) {
        whereClause.dateFrom = {
          [Op.gte]: filters.reservationDatesRange_from,
          [Op.lte]: filters.reservationDatesRange_to
        };
      }



      const totalCount = await ReservationModel.count({
          where: whereClause,
      });


      const totalPages = Math.ceil(totalCount / pageSize);


      const offset = (pageNumber - 1) * pageSize;


      const records = await ReservationModel.findAll({
          where: whereClause,
          limit: pageSize,
          offset: offset,
          order: [['createdAt', 'DESC']] //sort from the newest
      });



      return {
          records,
          pagination: {
            totalCount: totalCount,
            totalPages: totalPages,
            currentPage: pageNumber,
            hasPreviousPage: pageNumber > 1,
            hasNextPage: pageNumber < totalPages
          }
      };
  }
    
}



export default Reservation;
