const {DataTypes} = require('sequelize');



import { Op, Transaction } from "sequelize";
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
      refuelingDate: {
        type: DataTypes.DATE,
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
      averageConsumption: {
        type: DataTypes.REAL,
        allowNull: true,
      },
      costBrutto: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      costPerLiter: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      isFuelCardUsed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      moneyReturned: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isAcknowledgedByModerator: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
})


// const syncModel = async () => {
//   await RefuelingModel.sync({ force: true });
// }
// syncModel();



class Refueling {
    constructor(
        private id: number | null,
        private carID: number,
        private userID: number,
        private refuelingDate: Date,
        private lastEditedByModeratorOfID: number | null,
        private carMileage: number,
        private averageConsumption: number | null, //count by backend
        private numberOfLiters: number,
        private costBrutto: number,
        private costPerLiter: number | null, //count by backend
        private isFuelCardUsed: boolean,
        private moneyReturned: boolean | null,
        private invoiceNumber: string | null,
        private isAcknowledgedByModerator: boolean | null,
        ) {}

    changeAverageConsumption(averageConsumption: number) {
      this.averageConsumption = averageConsumption;
    }
    changeCostPerLiter(costPerLiter: number) {
      this.costPerLiter = costPerLiter;
    }

    async addOneRefueling() {
        await RefuelingModel.create({
          id: this.id,
          carID: this.carID,
          userID: this.userID,
          refuelingDate: this.refuelingDate,
          lastEditedByModeratorOfID: this.lastEditedByModeratorOfID,
          carMileage: this.carMileage,
          averageConsumption: this.averageConsumption,
          numberOfLiters: this.numberOfLiters,
          costBrutto: this.costBrutto,
          costPerLiter: this.costPerLiter,
          isFuelCardUsed: this.isFuelCardUsed,
          moneyReturned: this.moneyReturned,
          invoiceNumber: this.invoiceNumber,
          isAcknowledgedByModerator: this.isAcknowledgedByModerator,
        })
    }


    async updateOneRefueling() {
      await RefuelingModel.update({
        // id: this.id,
        // carID: this.carID,
        userID: this.userID,
        refuelingDate: this.refuelingDate,
        lastEditedByModeratorOfID: this.lastEditedByModeratorOfID,
        carMileage: this.carMileage,
        averageConsumption: this.averageConsumption,
        numberOfLiters: this.numberOfLiters,
        costBrutto: this.costBrutto,
        costPerLiter: this.costPerLiter,
        isFuelCardUsed: this.isFuelCardUsed,
        moneyReturned: this.moneyReturned,
        invoiceNumber: this.invoiceNumber,
        isAcknowledgedByModerator: this.isAcknowledgedByModerator,
      },
      { where: {id: this.id} },
      )
  }


    
    async addOneRefuelingAndUpdateNext(nextRefuelingID: number) {
      let addedRecord;
      try {
        await sequelize.transaction(async (t: Transaction) => {
          addedRecord = await RefuelingModel.create({
            id: this.id,
            carID: this.carID,
            userID: this.userID,
            refuelingDate: this.refuelingDate,
            lastEditedByModeratorOfID: this.lastEditedByModeratorOfID,
            carMileage: this.carMileage,
            averageConsumption: this.averageConsumption,
            numberOfLiters: this.numberOfLiters,
            costBrutto: this.costBrutto,
            costPerLiter: this.costPerLiter,
            isFuelCardUsed: this.isFuelCardUsed,
            moneyReturned: this.moneyReturned,
            invoiceNumber: this.invoiceNumber,
            isAcknowledgedByModerator: this.isAcknowledgedByModerator,
          },
          { transaction: t }
          )

          const nextRefueling: any = await RefuelingModel.findByPk(nextRefuelingID, { transaction: t });
          if (nextRefueling) {
            // update average consumption of next refueling
            const NextRefuelingAverageConsumption: number = Number(((nextRefueling.dataValues.numberOfLiters / (nextRefueling.dataValues.carMileage - this.carMileage)) * 100).toFixed(2));
                nextRefueling.averageConsumption = NextRefuelingAverageConsumption;
                await nextRefueling.save({ transaction: t });
          } else {
            throw new Error('Next refueling not found.');
          }
        })
        return addedRecord;
      }
        catch (error) {
          throw new Error('Error while updating next refueling and adding the new one.')
        }
    }





    async updateOneRefuelingAndUpdateNext(nextRefuelingID: number) {
      let addedRecord;
      try {
        await sequelize.transaction(async (t: Transaction) => {
          addedRecord = await RefuelingModel.update({
            // id: this.id,
            // carID: this.carID,
            userID: this.userID,
            refuelingDate: this.refuelingDate,
            lastEditedByModeratorOfID: this.lastEditedByModeratorOfID,
            carMileage: this.carMileage,
            averageConsumption: this.averageConsumption,
            numberOfLiters: this.numberOfLiters,
            costBrutto: this.costBrutto,
            costPerLiter: this.costPerLiter,
            isFuelCardUsed: this.isFuelCardUsed,
            moneyReturned: this.moneyReturned,
            invoiceNumber: this.invoiceNumber,
            isAcknowledgedByModerator: this.isAcknowledgedByModerator,
          },
          {
            where: { id: this.id },
            transaction: t
          }
          )

          const nextRefueling: any = await RefuelingModel.findByPk(nextRefuelingID, { transaction: t });
          if (nextRefueling) {
            // update average consumption of next refueling
            const NextRefuelingAverageConsumption: number = Number(((nextRefueling.dataValues.numberOfLiters / (nextRefueling.dataValues.carMileage - this.carMileage)) * 100).toFixed(2));
                nextRefueling.averageConsumption = NextRefuelingAverageConsumption;
                await nextRefueling.save({ transaction: t });
          } else {
            throw new Error('Next refueling not found.');
          }
        })
        return addedRecord;
      }
        catch (error) {
          throw new Error('Error while updating current and next refueling.')
        }
    }










    static async deleteOneRefuelingAndUpdateNext(currentRefuelingID: number, nextRefuelingID: number, previousRefuelingID: number| null, setAverageConsumptionToNull: boolean) {
      try {
        await sequelize.transaction(async (t: Transaction) => {
          
          const currentRefueling = await RefuelingModel.findByPk(currentRefuelingID, { transaction: t });

          if (currentRefueling) {
            await currentRefueling.destroy({ transaction: t });
          }
          else {
            throw new Error('Refueling not found');
          }

          const nextRefueling: any = await RefuelingModel.findByPk(nextRefuelingID, { transaction: t });
          if (nextRefueling) {
            // update average consumption of next refueling
            let NextRefuelingAverageConsumption: number | null = null;
            if(!setAverageConsumptionToNull && previousRefuelingID !== null) {
              const previousRefueling: any = await RefuelingModel.findByPk(previousRefuelingID, { transaction: t });
              NextRefuelingAverageConsumption = Number(((nextRefueling.dataValues.numberOfLiters / (nextRefueling.dataValues.carMileage - previousRefueling.dataValues.carMileage)) * 100).toFixed(2));
            }
                nextRefueling.averageConsumption = NextRefuelingAverageConsumption;
                await nextRefueling.save({ transaction: t });
          } else {
            throw new Error('Next refueling not found.');
          }
        })
        return 'Refueling successfully deleted and next refueling updated.';
      }
        catch (error) {
          throw new Error('Error while updating current and next refueling.')
        }
    }







    static async deleteRefueling(id: number) {
      const refueling = await Refueling.fetchOne(id);

      if (refueling) {
        return await refueling.destroy();
      }
      else {
        throw new Error('Refueling not found');
      }
  
  }

















    static async fetchAll() {
        return await RefuelingModel.findAll()
    }

    static async fetchOne(id: number) {
        return await RefuelingModel.findOne({ where: { id: id } })
    }

    static async fetchLastRefuelingOfCar(carid: number) {
      return await RefuelingModel.findOne({
        where: {
          carID: carid,
        },
        order: [['carMileage', 'DESC']],
      })
    }

    static async fetchLastRefuelingOfUser(userid: number) { //of any car
      return await RefuelingModel.findOne({
        where: {
          userID: userid,
        },
        order: [['id', 'DESC']],
      })
    }




    static async fetchDuplicate(carMileage: number) {
      return await RefuelingModel.findOne({ where: { carMileage: carMileage } })
  }




    static async acknowledgeRefuelingByModerator(refuelingID: number, moderatorID: number) {
      return await RefuelingModel.update({
        acknowledgeRefuelingByModerator: moderatorID
      },
      {where: {id: refuelingID}},
      );
    }









    static async fetchAllRefuelingsWithFilters (filters:any, pageSize: number, pageNumber: number, sortFromOldest: boolean) {
      const whereClause: any = {};

      //arrays
      if (filters.carIDs && filters.carIDs.length > 0) {
        whereClause.carID = { [Op.in]: filters.carIDs };
      }
      if (filters.userIDs && filters.userIDs.length > 0) {
        whereClause.userID = { [Op.in]: filters.userIDs };
      }
      if (filters.isAcknowledgedByModeratorIDs && filters.isAcknowledgedByModeratorIDs.length > 0) {
        whereClause.isAcknowledgedByModerator = { [Op.in]: filters.isAcknowledgedByModeratorIDs };
      }
      if (filters.lastEditedByModeratorIDs && filters.lastEditedByModeratorIDs.length > 0) {
        whereClause.lastEditedByModeratorOfID = { [Op.in]: filters.lastEditedByModeratorIDs };
      }

      //booleans
      if (filters.isFuelCardUsed !== undefined && typeof filters.isFuelCardUsed === 'boolean') {
        if (filters.isFuelCardUsed) {
          whereClause.isFuelCardUsed = { [Op.eq]: true }; //true
        } else {
          whereClause.isFuelCardUsed = { [Op.eq]: false }; //false
        }
      }

      if (filters.moneyReturned !== undefined && typeof filters.moneyReturned === 'boolean') {
        if (filters.moneyReturned) {
          whereClause.moneyReturned = { [Op.eq]: true }; //true
        } else {
          whereClause.moneyReturned = { [Op.eq]: false }; //false
        }
      }

      if (filters.isAcknowledgedByModerator !== undefined && typeof filters.isAcknowledgedByModerator === 'boolean') {
        if (filters.isAcknowledgedByModerator) {
          whereClause.isAcknowledgedByModerator = { [Op.ne]: null }; //true
        } else {
          whereClause.isAcknowledgedByModerator = { [Op.eq]: null }; //false
        }
      }

      if (filters.lastEditedByModerator !== undefined && typeof filters.lastEditedByModerator === 'boolean') {
        if (filters.lastEditedByModerator) {
          whereClause.lastEditedByModeratorOfID = { [Op.ne]: null }; //true
        } else {
          whereClause.lastEditedByModeratorOfID = { [Op.eq]: null }; //false
        }
      }

      //from/to numbers
      if(filters.carMileage_from && filters.carMileage_to) {
        whereClause.carMileage = {
          [Op.gte]: filters.carMileage_from,
          [Op.lte]: filters.carMileage_to
        }
      }
      else if(filters.carMileage_from) {
        whereClause.carMileage = { [Op.gte]: filters.carMileage_from }
      }
      else if(filters.carMileage_to) {
        whereClause.carMileage = { [Op.lte]: filters.carMileage_to }
      }

      if(filters.numberOfLiters_from && filters.numberOfLiters_to) {
        whereClause.numberOfLiters = {
          [Op.gte]: filters.numberOfLiters_from,
          [Op.lte]: filters.numberOfLiters_to
        }
      }
      else if(filters.numberOfLiters_from) {
        whereClause.numberOfLiters = { [Op.gte]: filters.numberOfLiters_from }
      }
      else if(filters.numberOfLiters_to) {
        whereClause.numberOfLiters = { [Op.lte]: filters.numberOfLiters_to }
      }

      if(filters.averageConsumption_from && filters.averageConsumption_to) {
        whereClause.averageConsumption = {
          [Op.gte]: filters.averageConsumption_from,
          [Op.lte]: filters.averageConsumption_to
        }
      }
      else if(filters.averageConsumption_from) {
        whereClause.averageConsumption = { [Op.gte]: filters.averageConsumption_from }
      }
      else if(filters.averageConsumption_to) {
        whereClause.averageConsumption = { [Op.lte]: filters.averageConsumption_to }
      }

      if(filters.costBrutto_from && filters.costBrutto_to) {
        whereClause.costBrutto = {
          [Op.gte]: filters.costBrutto_from,
          [Op.lte]: filters.costBrutto_to
        }
      }
      else if(filters.costBrutto_from) {
        whereClause.costBrutto = { [Op.gte]: filters.costBrutto_from }
      }
      else if(filters.costBrutto_to) {
        whereClause.costBrutto = { [Op.lte]: filters.costBrutto_to }
      }

      if(filters.costPerLiter_from && filters.costPerLiter_to) {
        whereClause.costPerLiter = {
          [Op.gte]: filters.costPerLiter_from,
          [Op.lte]: filters.costPerLiter_to
        }
      }
      else if(filters.costPerLiter_from) {
        whereClause.costPerLiter = { [Op.gte]: filters.costPerLiter_from }
      }
      else if(filters.costPerLiter_to) {
        whereClause.costPerLiter = { [Op.lte]: filters.costPerLiter_to }
      }

      //strings (case-insensitive search)
      if(filters.invoiceNumber) {
        whereClause.invoiceNumber = { [Op.and]: [
          sequelize.where(sequelize.fn('LOWER', sequelize.col('invoiceNumber')), 'LIKE', `%${filters.invoiceNumber.toLowerCase()}%`)
        ] };
      }


      //from/to dates [add UTC+1 time (Warsaw, Poland). Correct passed date format is '2024-02-20']
      if(filters.refuelingDateRange_from && filters.refuelingDateRange_to) {
        whereClause.refuelingDate = {
          [Op.gte]: new Date(`${filters.refuelingDateRange_from}T00:00:00+01:00`),
          [Op.lte]: new Date(`${filters.refuelingDateRange_to}T23:59:59+01:00`)
        }
      }
      else if(filters.refuelingDateRange_from) {
        whereClause.refuelingDate = { [Op.gte]: new Date(`${filters.refuelingDateRange_from}T00:00:00+01:00`) }
      }
      else if(filters.refuelingDateRange_to) {
        whereClause.refuelingDate = { [Op.lte]: new Date(`${filters.refuelingDateRange_to}T23:59:59+01:00`) }
      }




      const totalCount = await RefuelingModel.count({
          where: whereClause,
      });


      const totalPages = Math.ceil(totalCount / pageSize);


      const offset = (pageNumber - 1) * pageSize;

      let sortDirection: 'ASC' | 'DESC' = 'DESC';
      if(sortFromOldest === true) {sortDirection = 'ASC'}

      const records = await RefuelingModel.findAll({
          where: whereClause,
          limit: pageSize,
          offset: offset,
          order: [['refuelingDate', sortDirection]] //'DESC' = sort from the newest; 'ASC' = sort from the oldest
      });

      


      let totalNumberOfLiters = await RefuelingModel.sum('numberOfLiters', {
        where: whereClause
      });
      if(totalNumberOfLiters === null) {totalNumberOfLiters = 0}



      let averageConsumption = null;
      const db_averageConsumption = await RefuelingModel.findAll({
        where: {
          ...whereClause,
          averageConsumption: {
            [Op.not]: null
          }
        },
        attributes: [[sequelize.fn('AVG', sequelize.col('averageConsumption')), 'calculatedAverageConsumption']],
      });

      if (db_averageConsumption.length > 0 && db_averageConsumption[0].dataValues.calculatedAverageConsumption !== null) {
        averageConsumption = db_averageConsumption[0].dataValues.calculatedAverageConsumption;
      }
      


      let totalCostBrutto = await RefuelingModel.sum('costBrutto', {
        where: whereClause
      });
      if(totalCostBrutto === null) {totalCostBrutto = 0}



      let averageCostPerLiter = null;
      let totalCostPerLiter = await RefuelingModel.sum('costPerLiter', {
        where: whereClause
      });
      if(totalCostPerLiter !== null && totalCount !== 0) {
        averageCostPerLiter = totalCostPerLiter / totalCount;
      }




      return {
          records,
          totalNumberOfLiters: totalNumberOfLiters,
          averageConsumption: averageConsumption,
          totalCostBrutto: totalCostBrutto,
          averageCostPerLiter: averageCostPerLiter,
          pagination: {
            totalCount: totalCount,
            totalPages: totalPages,
            currentPage: pageNumber,
            hasPreviousPage: pageNumber > 1,
            hasNextPage: pageNumber < totalPages
          }
      };
  }



  static async fetchAverageConsumptionOfCar (carid: number) {
    const response = await RefuelingModel.findAll({
      where: {
        carID: carid,
        averageConsumption: {
          [Op.not]: null
        },
      },
      attributes: [[sequelize.fn('AVG', sequelize.col('averageConsumption')), 'calculatedAverageConsumption']],
    });


    return response[0].dataValues.calculatedAverageConsumption;
  }

  









  static async findPreviousRefueling(carid: number, carmileage: number) {
    return await RefuelingModel.findOne({
        where: {
            carID: carid,
            carMileage: {
                [Op.lt]: carmileage
            }
        },
        order: [['carMileage', 'DESC']]
    });
  }



  static async findNextRefueling(carid: number, carmileage: number) {
    return await RefuelingModel.findOne({
        where: {
            carID: carid,
            carMileage: {
                [Op.gt]: carmileage
            }
        },
        order: [['carMileage', 'ASC']]
    });
  }












  static async fetchNumberOfRefuelingsAssociatedWithUser(userID: number, withoutModerator: boolean) {
    if(!withoutModerator) {
      return await RefuelingModel.count({
        where: {
          [Op.or]: [
            { userID: userID },
            { lastEditedByModeratorOfID: userID },
            { isAcknowledgedByModerator: userID },
          ]
        }
      });
    }
    else {
      return await RefuelingModel.count({
        where: {
          userID: userID
        }
      });
    }
  }

  static async fetchNumberOfRefuelingsAssociatedWithCar (carID: number) {
    return await RefuelingModel.count({ where: { carID: carID } })
  }
  









}

export default Refueling;
