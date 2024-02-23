const {DataTypes} = require('sequelize');



import { Op } from "sequelize";
import sequelize from "../database/database";
const PlaceModel = sequelize.define('Place', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      projectCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      placeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'banned'),
        allowNull: false
      },

})


// const syncModel = async () => {
//   await PlaceModel.sync({ force: true });
// }
// syncModel();



class Place {
    constructor(
        private id: number | null,
        private projectCode: string,
        private placeName: string,
        private projectName: string,
        private status: 'active' | 'banned',
        ) {}

    async addOnePlace() {
        await PlaceModel.create({
          id: this.id,
          projectCode: this.projectCode,
          placeName: this.placeName,
          projectName: this.projectName,
          status: this.status
        })
    }

    static async fetchAll(showBanned: boolean) {
        if(showBanned) {
            return await PlaceModel.findAll()
        }
        else {
            return await PlaceModel.findAll({where: {status: { [Op.ne]: 'banned' }}})
        }
  
    }

    static async fetchOne(id: number, showBanned: boolean) {
      if(showBanned) {
        return await PlaceModel.findOne({ where: { id: id } })
      }
      else {
          return await PlaceModel.findOne({where: { id: id, status: { [Op.ne]: 'banned' }}})
      }
    }

}

export default Place;
