const {DataTypes} = require('sequelize');


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
        allowNull: true,
      },
      costPerLiter: {
        type: DataTypes.REAL,
        allowNull: true,
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
        type: DataTypes.BOOLEAN,
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
        private lastEditedByModeratorOfID: number | null,
        private carMileage: number,
        private averageConsumption: null, //count by backend
        private numberOfLiters: number,
        private costBrutto: number | null,
        private costPerLiter: null, //count by backend
        private isFuelCardUsed: boolean,
        private moneyReturned: boolean | null,
        private invoiceNumber: string | null,
        private isAcknowledgedByModerator: boolean | null,
        ) {}

    async addOneRefueling() {
        await RefuelingModel.create({
          id: this.id,
          carID: this.carID,
          userID: this.userID,
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

    // async updateOneRefueling() {
    //   await RefuelingModel.update({
    //     // id: this.id,
    //     // carID: this.carID,
    //     userID: this.userID,
    //     lastEditedByModeratorOfID: this.lastEditedByModeratorOfID,
    //     carMileage: this.carMileage,
    //     numberOfLiters: this.numberOfLiters,
    //     costBrutto: this.costBrutto,
    //     isFuelCardUsed: this.isFuelCardUsed,
    //     isAcknowledgedByModerator: this.isAcknowledgedByModerator,
    //   },
    //   {where: {id: this.id}}
    //   )
    // }

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

    // static async acknowledgeRefuelingByModerator(refuelingID: number, value: boolean) {
    //   return await RefuelingModel.update({
    //     acknowledgeRefuelingByModerator: value
    //   },
    //   {where: {id: refuelingID}},
    //   );
    // }


}

export default Refueling;
