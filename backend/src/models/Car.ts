const {DataTypes, Op} = require('sequelize');




import sequelize from "../database/database";
const CarModel = sequelize.define('Car', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('passengerCar', 'bus', 'truck'),
        allowNull: false,
      },
      imgPath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      plateNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hasFuelCard: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      fuelCardPIN: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fuelType: {
        type: DataTypes.ENUM('diesel', 'petrol'),
        allowNull: false,
      },
      tankCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      loadCapacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      nextInspectionDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nextInsuranceDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      availabilityStatus: {
        type: DataTypes.ENUM('available', 'notAvailable', 'rented', 'onService', 'damaged', 'banned'),
        allowNull: true,
      },
      availabilityDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
})

// const syncModel = async () => {
//   await CarModel.sync({ force: true });
// }
// syncModel();


class Car {
    constructor(
        private id: number | null,
        private brand: string,
        private model: string,
        private type: 'passengerCar' | 'bus' | 'truck',
        private imgPath: string,
        private plateNumber: string,
        private hasFuelCard: boolean,
        private fuelCardPIN: string | null,
        private fuelType: 'diesel' | 'petrol',
        private tankCapacity: number, //liters
        private loadCapacity: number, //kilograms
        private nextInspectionDate: Date,
        private nextInsuranceDate: Date,
        private availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned',
        private availabilityDescription: string | null,
        ) {}

    async addOneCar() {
        await CarModel.create({
          id: this.id,
          brand: this.brand,
          model: this.model,
          type: this.type,
          imgPath: this.imgPath,
          plateNumber: this.plateNumber,
          hasFuelCard: this.hasFuelCard,
          fuelCardPIN: this.fuelCardPIN,
          fuelType: this.fuelType,
          tankCapacity: this.tankCapacity,
          loadCapacity: this.loadCapacity,
          nextInspectionDate: this.nextInspectionDate,
          nextInsuranceDate: this.nextInsuranceDate,
          availabilityStatus: this.availabilityStatus,
          availabilityDescription: this.availabilityDescription,
        })
    }


    async editOneCar() {
      await CarModel.update({
        // id: this.id,
        brand: this.brand,
        model: this.model,
        type: this.type,
        imgPath: this.imgPath,
        plateNumber: this.plateNumber,
        hasFuelCard: this.hasFuelCard,
        fuelCardPIN: this.fuelCardPIN,
        fuelType: this.fuelType,
        tankCapacity: this.tankCapacity,
        loadCapacity: this.loadCapacity,
        nextInspectionDate: this.nextInspectionDate,
        nextInsuranceDate: this.nextInsuranceDate,
        availabilityStatus: this.availabilityStatus,
        availabilityDescription: this.availabilityDescription,
      },
      {where: {id: this.id, availabilityStatus: { [Op.ne]: 'rented'}}}
      )
  }

  changeImgPath(newImgPath: string) {
    this.imgPath = newImgPath;
  }


    static async fetchAll(showBanned: boolean) {
      if(showBanned) {
        return await CarModel.findAll()
      }
      else {
        return await CarModel.findAll({where: {availabilityStatus: { [Op.ne]: 'banned' }}})
      }
    }

    static async fetchAllBasicData(showBanned: boolean) {
      if(showBanned) {
        return await CarModel.findAll({attributes: ['id', 'brand', 'model', 'imgPath', 'availabilityStatus']})
      }
      else {
        return await CarModel.findAll({attributes: ['id', 'brand', 'model', 'imgPath', 'availabilityStatus'], where: {availabilityStatus: { [Op.ne]: 'banned' }}})
      }
      
    }

    static async fetchOne(carid: number, showBanned: boolean) {
      if(showBanned) {
        return await CarModel.findOne({ where: {id: carid} })
      }
      else {
        return await CarModel.findOne({ where: {id: carid, availabilityStatus: { [Op.ne]: 'banned' }} })
      }
    }
    static async fetchOneBasicData(carid: number, showBanned: boolean) {
      if(showBanned) {
        return await CarModel.findOne({ where: {id: carid}, attributes: ['id', 'brand', 'model', 'imgPath', 'availabilityStatus']})
      }
      else {
        return await CarModel.findOne({ where: {id: carid, availabilityStatus: { [Op.ne]: 'banned' }}, attributes: ['id', 'brand', 'model', 'imgPath', 'availabilityStatus']})
      }
      
    }






    static async changeAvailabilityStatus(carID: number, status: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned') {
      await CarModel.update({
        availabilityStatus: status
      },
      {where: {id: carID}}
      )
    }







    static async deleteCar(id: number): Promise<boolean> {
      try {
      const car = await Car.fetchOne(id, true);
      
      if (car) {
        await car.destroy();
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








}



export default Car
export {CarModel}