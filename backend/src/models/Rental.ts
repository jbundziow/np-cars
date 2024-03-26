const {DataTypes, Op} = require('sequelize');
import sequelize from "../database/database";
import Car, { CarModel } from "./Car";
import getDatesForMonth from "../utilities/functions/getDateRangesForMonth";
import Place, { PlaceModel } from "./Place";
import getRandomColor from "../utilities/functions/getRandomColor";
import getDateRangesForYear from "../utilities/functions/getDateRangesForYear";
import { UserModel } from "./User";








export const RentalModel = sequelize.define('Rental', {
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
      distance: {
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
        private distance: number | null,
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
            distance: this.distance,
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













    //by admin
    async addOneFinishedRental() {
          return await RentalModel.create({
            // id: this.id,
            carID: this.carID,
            userID: this.userID,
            returnUserID: this.returnUserID,
            lastEditedByModeratorOfID: this.lastEditedByModeratorOfID,
            carMileageBefore: this.carMileageBefore,
            carMileageAfter: this.carMileageAfter,
            distance: this.distance,
            travelDestination: this.travelDestination,
            placeID: this.placeID,
            dateFrom: this.dateFrom,
            dateTo: this.dateTo,
          });
    }













    async editOneRental() {
      await RentalModel.update({
        // id: this.id,
        // carID: this.carID,
        userID: this.userID,
        returnUserID: this.returnUserID,
        lastEditedByModeratorOfID: this.lastEditedByModeratorOfID,
        carMileageBefore: this.carMileageBefore,
        carMileageAfter: this.carMileageAfter,
        distance: this.distance,
        travelDestination: this.travelDestination,
        placeID: this.placeID,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
      },
      {where: {id: this.id}})

    }

















    static async undoReturnRental(rentalID: number) {
      await RentalModel.update({
        // id: this.id,
        // carID: this.carID,
        // userID: this.userID,
        returnUserID: null,
        // lastEditedByModeratorOfID: this.lastEditedByModeratorOfID,
        // carMileageBefore: this.carMileageBefore,
        carMileageAfter: null,
        distance: null,
        // travelDestination: this.travelDestination,
        // placeID: this.placeID,
        // dateFrom: this.dateFrom,
        dateTo: null,
      },
      {where: {id: rentalID}})

    }
















    //by normal user
    static async returnCar(rentalID: number, carID: number, returnUserID: number, carMileageBefore: number, carMileageAfter: number, dateTo: Date, travelDestination: string | null) {
      let rentalData;
      try {
        await sequelize.transaction(async (t) => {
          rentalData = await RentalModel.update({
            returnUserID: returnUserID,
            carMileageAfter: carMileageAfter,
            distance: carMileageAfter - carMileageBefore,
            dateTo: dateTo,
            travelDestination: travelDestination,
          },
          {where: {id: rentalID, carID: carID, carMileageBefore: carMileageBefore},
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
          [Op.or]: [
            { 
              [Op.and]: [
                { carMileageAfter: { [Op.eq]: sequelize.literal(`(SELECT MAX(carMileageAfter) FROM Rentals WHERE carID = ${carid})`) } },
                { carMileageBefore: { [Op.eq]: sequelize.literal(`(SELECT MAX(carMileageBefore) FROM Rentals WHERE carID = ${carid})`) } },
              ]
            },
            { carMileageAfter: null },
          ]
        },
      })
    }












    static async fetchLastRentalOfUser(userID: number) {
      return await RentalModel.findOne({
      where: {
        userID: userID,
      },
      order: [['id', 'DESC']],
      });
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
      else if (type === 'closed') {
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















    

    static async fetchAllRentalsWithFilters (filters:any, pageSize: number, pageNumber: number, sortBy: string, sortOrder: 'ASC' | 'DESC') {
        const whereClause: any = {};

        //arrays
        if (filters.carIDs && filters.carIDs.length > 0) {
          whereClause.carID = { [Op.in]: filters.carIDs };
        }
        if (filters.userIDs && filters.userIDs.length > 0) {
          whereClause.userID = { [Op.in]: filters.userIDs };
        }
        if (filters.returnUserIDs && filters.returnUserIDs.length > 0) {
          whereClause.returnUserID = { [Op.in]: filters.returnUserIDs };
        }
        if (filters.placeIDs && filters.placeIDs.length > 0) {
          whereClause.placeID = { [Op.in]: filters.placeIDs };
        }

        //booleans
        if (filters.editedByModerator !== undefined && typeof filters.editedByModerator === 'boolean') {
          if (filters.editedByModerator) {
            whereClause.lastEditedByModeratorOfID = { [Op.ne]: null }; //true
          } else {
            whereClause.lastEditedByModeratorOfID = { [Op.eq]: null }; //false
          }
        }

        //from/to numbers
        if(filters.carMileageBefore_from && filters.carMileageBefore_to) {
          whereClause.carMileageBefore = {
            [Op.gte]: filters.carMileageBefore_from,
            [Op.lte]: filters.carMileageBefore_to
          }
        }
        else if(filters.carMileageBefore_from) {
          whereClause.carMileageBefore = { [Op.gte]: filters.carMileageBefore_from }
        }
        else if(filters.carMileageBefore_to) {
          whereClause.carMileageBefore = { [Op.lte]: filters.carMileageBefore_to }
        }

        if(filters.carMileageAfter_from && filters.carMileageAfter_to) {
          whereClause.carMileageAfter = {
            [Op.gte]: filters.carMileageAfter_from,
            [Op.lte]: filters.carMileageAfter_to
          }
        }
        else if(filters.carMileageAfter_from) {
          whereClause.carMileageAfter = { [Op.gte]: filters.carMileageAfter_from }
        }
        else if(filters.carMileageAfter_to) {
          whereClause.carMileageAfter = { [Op.lte]: filters.carMileageAfter_to }
        }

        if(filters.distance_from && filters.distance_to) {
          whereClause.distance = {
            [Op.gte]: filters.distance_from,
            [Op.lte]: filters.distance_to
          }
        }
        else if(filters.distance_from) {
          whereClause.distance = { [Op.gte]: filters.distance_from }
        }
        else if(filters.distance_to) {
          whereClause.distance = { [Op.lte]: filters.distance_to }
        }

        //strings (case-insensitive search)
        if(filters.travelDestination) {
          whereClause.travelDestination = { [Op.and]: [
            sequelize.where(sequelize.fn('LOWER', sequelize.col('travelDestination')), 'LIKE', `%${filters.travelDestination.toLowerCase()}%`)
          ] };
        }


        //from/to dates [add UTC+1 time (Warsaw, Poland). Correct passed date format is '2024-02-20']
        if(filters.dateFrom_from && filters.dateFrom_to) {
          whereClause.dateFrom = {
            [Op.gte]: new Date(`${filters.dateFrom_from}T00:00:00+01:00`),
            [Op.lte]: new Date(`${filters.dateFrom_to}T23:59:59+01:00`)
          }
        }
        else if(filters.dateFrom_from) {
          whereClause.dateFrom = { [Op.gte]: new Date(`${filters.dateFrom_from}T00:00:00+01:00`) }
        }
        else if(filters.dateFrom_to) {
          whereClause.dateFrom = { [Op.lte]: new Date(`${filters.dateFrom_to}T23:59:59+01:00`) }
        }

        if(filters.dateTo_from && filters.dateTo_to) {
          whereClause.dateTo = {
            [Op.gte]: new Date(`${filters.dateTo_from}T00:00:00+01:00`),
            [Op.lte]: new Date(`${filters.dateTo_to}T23:59:59+01:00`)
          }
        }
        else if(filters.dateTo_from) {
          whereClause.dateTo = { [Op.gte]: new Date(`${filters.dateTo_from}T00:00:00+01:00`) }
        }
        else if(filters.dateTo_to) {
          whereClause.dateTo = { [Op.lte]: new Date(`${filters.dateTo_to}T23:59:59+01:00`) }
        }



        const totalCount = await RentalModel.count({
            where: whereClause,
        });


        const totalPages = Math.ceil(totalCount / pageSize);


        const offset = (pageNumber - 1) * pageSize;


        


        const records = await RentalModel.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
            order: [[sortBy, sortOrder]],
        });

        
        let totalDistance = await RentalModel.sum('distance', {
          where: whereClause
        });
        if(totalDistance === null) {totalDistance = 0}


        return {
            records,
            totalDistance: totalDistance,
            pagination: {
              totalCount: totalCount,
              totalPages: totalPages,
              currentPage: pageNumber,
              hasPreviousPage: pageNumber > 1,
              hasNextPage: pageNumber < totalPages
            }
        };
    }









    static async fetchAllPendingRentals () {
      return await RentalModel.findAll({ where: { carMileageAfter: null } })
    }









    static async fetchNumberOfRentalsAssociatedWithPlace (placeID: number) {
      return await RentalModel.count({ where: { placeID: placeID } })
    }











    static async fetchNumberOfRentalsAssociatedWithUser(userID: number, withoutReturnUser: boolean, withoutModerator: boolean) {
      if(!withoutReturnUser && !withoutModerator) {
        return await RentalModel.count({
          where: {
            [Op.or]: [
              { userID: userID },
              { returnUserID: userID },
              { lastEditedByModeratorOfID: userID }
            ]
          }
        });
      }
      else if(withoutReturnUser && !withoutModerator) {
        return await RentalModel.count({
          where: {
            [Op.or]: [
              { userID: userID },
              { lastEditedByModeratorOfID: userID }
            ]
          }
        });
      }
      else if(!withoutReturnUser && withoutModerator) {
        return await RentalModel.count({
          where: {
            [Op.or]: [
              { userID: userID },
              { returnUserID: userID },
            ]
          }
        });
      }
      else {
        return await RentalModel.count({
          where: {
            userID: userID
          }
        });
      }
    }
      











    

    static async fetchNumberOfRentalsAssociatedWithCar (carID: number) {
      return await RentalModel.count({ where: { carID: carID } })
    }













    static findMileageGaps = async (carID: number, excludeOneRental: boolean, excludeRentalID?: number) => {
      try {
        
        let whereClause = { where: { carID: carID } };
        if (excludeOneRental) {
          whereClause = { where: { carID: carID, id: { [Op.ne]: excludeRentalID } } as any };
        }
        const rentals = await RentalModel.findAll(whereClause);

        //create a set to store unique mileage values
        const mileageSet = new Set<number>();

        //add values to the set
        rentals.forEach((rental: any) => {
          if(rental.carMileageBefore !== null) {mileageSet.add(rental.carMileageBefore)}
          if(rental.carMileageAfter !== null) {mileageSet.add(rental.carMileageAfter)}
        });



        //convert set to array and sort it
        const sortedMileageArray = Array.from(mileageSet).sort((a, b) => a - b);

        //boundary values
        const firstMileage = sortedMileageArray[0];
        const lastMileage = sortedMileageArray[sortedMileageArray.length - 1];
    
        //check for gaps
        const gaps = [];
        for (let i = 0; i < sortedMileageArray.length - 1; i++) {
          const currentMileage = sortedMileageArray[i];
          const nextMileage = sortedMileageArray[i + 1];
          const foundOverlap = rentals.some((rental: any) => {
            return rental.carMileageBefore === currentMileage && rental.carMileageAfter === nextMileage;
          });
          if (!foundOverlap) {
            gaps.push({
              gapStart: currentMileage,
              gapEnd: nextMileage
            });
          }
        }
    
        
        return {
          carID: carID,
          excludedRentalID: excludeOneRental ? excludeRentalID : null,
          firstMileage: firstMileage,
          lastMileage: lastMileage,
          gaps: gaps
        };
        
      } catch (err) {
        throw new Error('Error while finding mileage gaps');
      }
    };

















    static async deleteRental(id: number): Promise<boolean> {
      try {
        const rental = await Rental.fetchOne(id);
  
        if (rental) {
          await rental.destroy();
          return true;
        }
        else {
          return false;
        }
      }
      catch(err) {
        return false;
      }
    }
















    static getTotalDistanceForUserByMonthInYear = async (userID: number, year: number) => {
      const totalDistances: any[] = [];
    
      for (let month = 0; month < 12; month++) {
        const { startDate, endDate } = getDatesForMonth(year, month);
    
        const totalDistance = await RentalModel.sum('distance', {
          where: {
            userID: userID,
            dateTo: {
              [Op.between]: [startDate, endDate]
            }
          }
        });
    
        totalDistances.push({
          month_num: month,
          month_text: new Date(year, month).toLocaleString('en-US', { month: 'long' }),
          total_distance: totalDistance || 0
        });
      }
    
      return totalDistances;
    };

















    static getTotalDistanceForCarByMonthInYear = async (carID: number, year: number) => {
      const totalDistances: any[] = [];
    
      for (let month = 0; month < 12; month++) {
        const { startDate, endDate } = getDatesForMonth(year, month);
    
        const totalDistance = await RentalModel.sum('distance', {
          where: {
            carID: carID,
            dateTo: {
              [Op.between]: [startDate, endDate]
            }
          }
        });
    
        totalDistances.push({
          month_num: month,
          month_text: new Date(year, month).toLocaleString('en-US', { month: 'long' }),
          total_distance: totalDistance || 0
        });
      }
    
      return totalDistances;
    };



















    static getTotalDistanceForPlaceByMonthInYear = async (placeID: number, year: number) => {
      const totalDistances: any[] = [];
    
      for (let month = 0; month < 12; month++) {
        const { startDate, endDate } = getDatesForMonth(year, month);
    
        const totalDistance = await RentalModel.sum('distance', {
          where: {
            placeID: placeID,
            dateTo: {
              [Op.between]: [startDate, endDate]
            }
          }
        });
    
        totalDistances.push({
          month_num: month,
          month_text: new Date(year, month).toLocaleString('en-US', { month: 'long' }),
          total_distance: totalDistance || 0
        });
      }
    
      return totalDistances;
    };
  














    

    static getTotalDistanceForUserByMonthInYearAndCarType = async (userID: number, year: number) => {

      const allCars = await Car.fetchAll(true);
      const passengerCarIDs = allCars.filter((car: any) => car.type === 'passengerCar').map((car: any) => car.id);
      const busAndTruckIDs = allCars.filter((car: any) => car.type === 'bus' || car.type === 'truck').map((car: any) => car.id);



      const totalDistances: any[] = [];
    
      for (let month = 0; month < 12; month++) {
        const { startDate, endDate } = getDatesForMonth(year, month);
    
        const total_distance_passengerCar = await RentalModel.sum('distance', {
          where: {
            carID: passengerCarIDs,
            userID: userID,
            dateTo: {
              [Op.between]: [startDate, endDate]
            }
          }
        });

        const total_distance_bus_and_truck = await RentalModel.sum('distance', {
          where: {
            carID: busAndTruckIDs,
            userID: userID,
            dateTo: {
              [Op.between]: [startDate, endDate]
            }
          }
        });
    
        totalDistances.push({
          month_num: month,
          month_text: new Date(year, month).toLocaleString('en-US', { month: 'long' }),
          total_distance_passengerCar: total_distance_passengerCar || 0,
          total_distance_bus_and_truck: total_distance_bus_and_truck || 0,
        });
      }
    
      return totalDistances;
    };



















    static getTotalDistanceForPlaceByMonthInYearAndCarType = async (placeID: number, year: number) => {

      const allCars = await Car.fetchAll(true);
      const passengerCarIDs = allCars.filter((car: any) => car.type === 'passengerCar').map((car: any) => car.id);
      const busAndTruckIDs = allCars.filter((car: any) => car.type === 'bus' || car.type === 'truck').map((car: any) => car.id);



      const totalDistances: any[] = [];
    
      for (let month = 0; month < 12; month++) {
        const { startDate, endDate } = getDatesForMonth(year, month);
    
        const total_distance_passengerCar = await RentalModel.sum('distance', {
          where: {
            carID: passengerCarIDs,
            placeID: placeID,
            dateTo: {
              [Op.between]: [startDate, endDate]
            }
          }
        });

        const total_distance_bus_and_truck = await RentalModel.sum('distance', {
          where: {
            carID: busAndTruckIDs,
            placeID: placeID,
            dateTo: {
              [Op.between]: [startDate, endDate]
            }
          }
        });
    
        totalDistances.push({
          month_num: month,
          month_text: new Date(year, month).toLocaleString('en-US', { month: 'long' }),
          total_distance_passengerCar: total_distance_passengerCar || 0,
          total_distance_bus_and_truck: total_distance_bus_and_truck || 0,
        });
      }
    
      return totalDistances;
    };


















    
    static getTotalDistanceForAllPlacesOfUser = async (userID: number) => {

      const allPlaces = await PlaceModel.findAll({attributes: ['id', 'projectCode']});
      if(allPlaces.length === 0) {return []}
      const placeIDs = allPlaces.map((place: any) => place.id);

      const totalDistances: any[] = [];

      for await (const placeID of placeIDs) {

        const total_distance = await RentalModel.sum('distance', {
        where: {
          placeID: placeID,
          userID: userID,
        }
        });
      
        totalDistances.push({
        placeData: allPlaces.filter((place: any) => place.id === placeID)[0] || null,
        total_distance: total_distance || 0,
        random_color: getRandomColor(),
        });
      
      }

      totalDistances.sort((a, b) => b.total_distance - a.total_distance);
    
      return totalDistances;
    };





















    static getTotalDistanceForAllPlacesOfCar = async (carID: number) => {

      const allPlaces = await PlaceModel.findAll({attributes: ['id', 'projectCode']});
      if(allPlaces.length === 0) {return []}
      const placeIDs = allPlaces.map((place: any) => place.id);

      const totalDistances: any[] = [];

      for await (const placeID of placeIDs) {

        const total_distance = await RentalModel.sum('distance', {
        where: {
          placeID: placeID,
          carID: carID,
        }
        });
      
        totalDistances.push({
        placeData: allPlaces.filter((place: any) => place.id === placeID)[0] || null,
        total_distance: total_distance || 0,
        random_color: getRandomColor(),
        });
      
      }

      totalDistances.sort((a, b) => b.total_distance - a.total_distance);
    
      return totalDistances;
    };


















    static getTotalDistanceForAllUsersByPlace = async (placeID: number) => {

      const allUsers = await UserModel.findAll({attributes: ['id', 'name', 'surname']});
      if(allUsers.length === 0) {return []}
      const userIDs = allUsers.map((user: any) => user.id);

      const totalDistances: any[] = [];

      for await (const userID of userIDs) {

        const total_distance = await RentalModel.sum('distance', {
        where: {
          placeID: placeID,
          userID: userID,
        }
        });
      
        totalDistances.push({
        userData: allUsers.filter((user: any) => user.id === userID)[0] || null,
        total_distance: total_distance || 0,
        random_color: getRandomColor(),
        });
      
      }

      totalDistances.sort((a, b) => b.total_distance - a.total_distance);
    
      return totalDistances;
    };


















    static getTotalDistanceForAllUsersByCar = async (carID: number) => {

      const allUsers = await UserModel.findAll({attributes: ['id', 'name', 'surname']});
      if(allUsers.length === 0) {return []}
      const userIDs = allUsers.map((user: any) => user.id);

      const totalDistances: any[] = [];

      for await (const userID of userIDs) {

        const total_distance = await RentalModel.sum('distance', {
        where: {
          carID: carID,
          userID: userID,
        }
        });
      
        totalDistances.push({
        userData: allUsers.filter((user: any) => user.id === userID)[0] || null,
        total_distance: total_distance || 0,
        random_color: getRandomColor(),
        });
      
      }

      totalDistances.sort((a, b) => b.total_distance - a.total_distance);
    
      return totalDistances;
    };




















    static getTotalDistanceForAllCarsByPlace = async (placeID: number) => {

      const allCars = await CarModel.findAll({attributes: ['id', 'brand', 'model']});
      if(allCars.length === 0) {return []}
      const carIDs = allCars.map((car: any) => car.id);

      const totalDistances: any[] = [];

      for await (const carID of carIDs) {

        const total_distance = await RentalModel.sum('distance', {
        where: {
          placeID: placeID,
          carID: carID,
        }
        });
      
        totalDistances.push({
        carData: allCars.filter((car: any) => car.id === carID)[0] || null,
        total_distance: total_distance || 0,
        random_color: getRandomColor(),
        });
      
      }

      totalDistances.sort((a, b) => b.total_distance - a.total_distance);
    
      return totalDistances;
    };














    




    static getCarWithGreatestSummarizedDistanceOfUser = async (userID: number, year: number | null) => {
      try {
        let whereClause: any = {userID: userID, carID: {[Op.ne]: null}};
        if(year) {
          const {startDate, endDate} = getDateRangesForYear(year);
          whereClause.dateTo = {[Op.between]: [startDate, endDate]};
        }

        const result = await RentalModel.findOne({
          where: whereClause,
          attributes: [
            'carID',
            [sequelize.fn('SUM', sequelize.col('distance')), 'summarizedDistance']
          ],
          group: ['carID'],
          order: [[sequelize.literal('summarizedDistance'), 'DESC']],
          limit: 1,
        });


        let carData = null;
        if(result && result.dataValues.carID) {
          carData = await Car.fetchOneBasicData(result.dataValues.carID, true);
        }
    
        return result ? { carData, total_distance: result.get('summarizedDistance') || 0 } : null;
      } catch (error) {
        console.log(error);
        throw new Error('Error occurred while fetching car with greatest summarized distance.');
      }
    };





















    static getCarWithGreatestSummarizedDistanceOfPlace = async (placeID: number, year: number | null) => {
      try {
        let whereClause: any = {placeID: placeID, carID: {[Op.ne]: null}};
        if(year) {
          const {startDate, endDate} = getDateRangesForYear(year);
          whereClause.dateTo = {[Op.between]: [startDate, endDate]};
        }

        const result = await RentalModel.findOne({
          where: whereClause,
          attributes: [
            'carID',
            [sequelize.fn('SUM', sequelize.col('distance')), 'summarizedDistance']
          ],
          group: ['carID'],
          order: [[sequelize.literal('summarizedDistance'), 'DESC']],
          limit: 1,
        });


        let carData = null;
        if(result && result.dataValues.carID) {
          carData = await Car.fetchOneBasicData(result.dataValues.carID, true);
        }
    
        return result ? { carData, total_distance: result.get('summarizedDistance') || 0 } : null;
      } catch (error) {
        console.log(error);
        throw new Error('Error occurred while fetching car with greatest summarized distance.');
      }
    };



















    static getPlaceWithGreatestSummarizedDistanceOfUser = async (userID: number, year: number | null) => {
      try {
        let whereClause: any = {userID: userID, placeID: {[Op.ne]: null}};
        if(year) {
          const {startDate, endDate} = getDateRangesForYear(year);
          whereClause.dateTo = {[Op.between]: [startDate, endDate]};
        }

        const result = await RentalModel.findOne({
          where: whereClause,
          attributes: [
            'placeID',
            [sequelize.fn('SUM', sequelize.col('distance')), 'summarizedDistance']
          ],
          group: ['placeID'],
          order: [[sequelize.literal('summarizedDistance'), 'DESC']],
          limit: 1,
        });

        let placeData = null;
        if(result && result.dataValues.placeID) {
          placeData = await PlaceModel.findOne({where: { id: result.dataValues.placeID }, attributes: ['id', 'projectCode'] });
        }
    
        return result ? { placeData, total_distance: result.get('summarizedDistance') || 0 } : null;
      } catch (error) {
        console.log(error);
        throw new Error('Error occurred while fetching place with greatest summarized distance.');
      }
    };




















    static getPlaceWithGreatestSummarizedDistanceOfCar = async (carID: number, year: number | null) => {
      try {
        let whereClause: any = {carID: carID, placeID: {[Op.ne]: null}};
        if(year) {
          const {startDate, endDate} = getDateRangesForYear(year);
          whereClause.dateTo = {[Op.between]: [startDate, endDate]};
        }

        const result = await RentalModel.findOne({
          where: whereClause,
          attributes: [
            'placeID',
            [sequelize.fn('SUM', sequelize.col('distance')), 'summarizedDistance']
          ],
          group: ['placeID'],
          order: [[sequelize.literal('summarizedDistance'), 'DESC']],
          limit: 1,
        });

        let placeData = null;
        if(result && result.dataValues.placeID) {
          placeData = await PlaceModel.findOne({where: { id: result.dataValues.placeID }, attributes: ['id', 'projectCode'] });
        }
    
        return result ? { placeData, total_distance: result.get('summarizedDistance') || 0 } : null;
      } catch (error) {
        console.log(error);
        throw new Error('Error occurred while fetching place with greatest summarized distance.');
      }
    };




















    static getUserWithGreatestSummarizedDistanceOfPlace = async (placeID: number, year: number | null) => {
      try {
        let whereClause: any = {placeID: placeID, userID: {[Op.ne]: null}};
        if(year) {
          const {startDate, endDate} = getDateRangesForYear(year);
          whereClause.dateTo = {[Op.between]: [startDate, endDate]};
        }

        const result = await RentalModel.findOne({
          where: whereClause,
          attributes: [
            'userID',
            [sequelize.fn('SUM', sequelize.col('distance')), 'summarizedDistance']
          ],
          group: ['userID'],
          order: [[sequelize.literal('summarizedDistance'), 'DESC']],
          limit: 1,
        });

        let userData = null;
        if(result && result.dataValues.userID) {
          userData = await UserModel.findOne({where: { id: result.dataValues.userID }, attributes: ['id', 'name', 'surname'] });
        }
    
        return result ? { userData, total_distance: result.get('summarizedDistance') || 0 } : null;
      } catch (error) {
        console.log(error);
        throw new Error('Error occurred while fetching user with greatest summarized distance.');
      }
    };



















    static getUserWithGreatestSummarizedDistanceOfCar = async (carID: number, year: number | null) => {
      try {
        let whereClause: any = {carID: carID, userID: {[Op.ne]: null}};
        if(year) {
          const {startDate, endDate} = getDateRangesForYear(year);
          whereClause.dateTo = {[Op.between]: [startDate, endDate]};
        }

        const result = await RentalModel.findOne({
          where: whereClause,
          attributes: [
            'userID',
            [sequelize.fn('SUM', sequelize.col('distance')), 'summarizedDistance']
          ],
          group: ['userID'],
          order: [[sequelize.literal('summarizedDistance'), 'DESC']],
          limit: 1,
        });

        let userData = null;
        if(result && result.dataValues.userID) {
          userData = await UserModel.findOne({where: { id: result.dataValues.userID }, attributes: ['id', 'name', 'surname'] });
        }
    
        return result ? { userData, total_distance: result.get('summarizedDistance') || 0 } : null;
      } catch (error) {
        console.log(error);
        throw new Error('Error occurred while fetching user with greatest summarized distance.');
      }
    };



















  }






export default Rental;
