const {DataTypes} = require('sequelize');
import { Op } from "sequelize";
import sequelize from "../database/database";









export const FaultModel = sequelize.define('Fault', {
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
      moderatorID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      lastChangeAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'accepted', 'finished', 'cancelled'),
        allowNull: false,
      },
      resultDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      repairCost: {
        type: DataTypes.REAL,
        allowNull: true,
      },

})









// const syncModel = async () => {
//   await FaultModel.sync({ force: true });
// }
// syncModel();











class Fault {
    constructor(
        private id: number | null,
        private carID: number,
        private userID: number,
        private moderatorID: number | null,
        private lastChangeAt: Date | null,
        private title: string,
        private description: string,  
        private status: 'pending' | 'accepted' | 'finished' | 'cancelled',
        private resultDescription: string | null,
        private repairCost: number | null,
        ) {}












    async addOneFault() {
        await FaultModel.create({
          id: this.id,
          carID: this.carID,
          userID: this.userID,
          moderatorID: this.moderatorID,
          lastChangeAt: this.lastChangeAt,
          title: this.title,
          description: this.description,
          status: this.status,
          resultDescription: this.resultDescription,
          repairCost: this.repairCost,
        })
    }











    async updateOneFault() {
      await FaultModel.update({
        // id: this.id,
        // carID: this.carID,
        userID: this.userID,
        moderatorID: this.moderatorID,
        lastChangeAt: this.lastChangeAt,
        title: this.title,
        description: this.description,
        status: this.status,
        resultDescription: this.resultDescription,
        repairCost: this.repairCost,
      },
      { where: {id: this.id} },
      )
  }











  static async acknowledgeFaultByModerator(faultID: number, moderatorID: number) {
    return await FaultModel.update({
      status: 'accepted',
      moderatorID: moderatorID,
    },
    {where: {id: faultID}},
    );
  }











    static async fetchAll() {
        return await FaultModel.findAll()
    }












    static async fetchOne(id: number) {
        return await FaultModel.findOne({ where: { id: id } })
    }












    static async fetchDuplicate(carid: number, title: string, description: string) {
      return await FaultModel.findOne({ where: { carID: carid, title, description } })
    }













    static async fetchAllByCarIdAndStatus(carID: number, status: 'pending' | 'accepted' | 'finished' | 'cancelled') {
      return await FaultModel.findAll({ where: { carID: carID, status: status } })
    }


















    static async fetchAllByCarIdAndStatusBasic(carID: number, status: 'pending' | 'accepted' | 'finished' | 'cancelled') {
      return await FaultModel.findAll({ where: { carID: carID, status: status }, attributes: ['id', 'title'] })
    }















    static async fetchNumberOfRecordsOfCarThatHaveStatus(status: 'pending' | 'accepted' | 'finished' | 'cancelled', carID: number) {
      return await FaultModel.count({ where: { status: status, carID: carID } })
    }














    static async fetchAllOfUser(userID: number, pageSize: number, pageNumber: number, sortFromOldest: boolean) {

      const whereClause = { userID: userID };

      const totalCount = await FaultModel.count({
        where: whereClause,
      });

      const totalPages = Math.ceil(totalCount / pageSize);


      const offset = (pageNumber - 1) * pageSize;

      let sortDirection: 'ASC' | 'DESC' = 'DESC';
      if(sortFromOldest === true) {sortDirection = 'ASC'}

      const records = await FaultModel.findAll({
          where: whereClause,
          limit: pageSize,
          offset: offset,
          order: [['createdAt', sortDirection]] //'DESC' = sort from the newest; 'ASC' = sort from the oldest
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
    

    }
  }














  static async fetchAllByStatus(status: 'pending' | 'accepted' | 'finished' | 'cancelled', pageSize: number, pageNumber: number, sortFromOldest: boolean) {

    const whereClause = { status: status }

    const totalCount = await FaultModel.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(totalCount / pageSize);


    const offset = (pageNumber - 1) * pageSize;

    let sortDirection: 'ASC' | 'DESC' = 'DESC';
    if(sortFromOldest === true) {sortDirection = 'ASC'}

    const records = await FaultModel.findAll({
        where: whereClause,
        limit: pageSize,
        offset: offset,
        order: [['createdAt', sortDirection]] //'DESC' = sort from the newest; 'ASC' = sort from the oldest
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
  

  }
}















    static async fetchAllOfUserBasic(userID: number) {
      return await FaultModel.findAll({ where: { userID: userID }, attributes: ['id', 'carID', 'title', 'status'] })
    }













    static async deleteFault(id: number) {
      const fault = await Fault.fetchOne(id);

      if (fault) {
        return await fault.destroy();
      }
      else {
        throw new Error('Fault not found');
      }
    }












    static async fetchNumberOfFaultsAssociatedWithUser(userID: number, withoutModerator: boolean) {
      if(!withoutModerator) {
        return await FaultModel.count({
          where: {
            [Op.or]: [
              { userID: userID },
              { moderatorID: userID },
            ]
          }
        });
      }
      else {
        return await FaultModel.count({
          where: {
            userID: userID
          }
        });
      }
    }

    















    static async fetchNumberOfFaultsAssociatedWithCar (carID: number) {
      return await FaultModel.count({ where: { carID: carID } })
    }








}



export default Fault;
