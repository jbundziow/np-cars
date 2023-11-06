const {DataTypes} = require('sequelize');



import sequelize from "../database/database";
const FaultModel = sequelize.define('Fault', {
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
        private resultDesctiption: string | null,
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
          resultDesctiption: this.resultDesctiption,
          repairCost: this.repairCost,
        })
    }

    static async fetchAll() {
        return await FaultModel.findAll()
    }

    static async fetchOne(id: number) {
        return await FaultModel.findOne({ where: { id: id } })
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

    static async fetchAllOfUser(userID: number) {
      return await FaultModel.findAll({ where: { userID: userID } })
    }
    static async fetchAllOfUserBasic(userID: number) {
      return await FaultModel.findAll({ where: { userID: userID }, attributes: ['id', 'carID', 'title', 'status'] })
    }

}



export default Fault;
