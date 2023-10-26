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
      // carFullname: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // carImg: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // userFullname: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      moderatorID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      // moderatorFullname: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
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



class Fault {
    constructor(
        private id: number | null,
        private carID: number,
        // private carFullname: string,
        // private carImg: string,
        private userID: number,
        // private userFullname: string,
        private moderatorID: number | null,
        // private moderatorFullname: string,
        //private createdAt: string,
        private lastChangeAt: string | null,
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
          // carFullname: this.carFullname,
          // carImg: this.carImg,
          userID: this.userID,
          // userFullname: this.userFullname,
          moderatorID: this.moderatorID,
          // moderatorFullname: this.moderatorFullname,
          //createdAt: this.createdAt,
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
}



export default Fault;
