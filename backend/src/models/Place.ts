const {DataTypes} = require('sequelize');



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
        private status: 'visible' | 'unvisible',
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

    static async fetchAll() {
        return await PlaceModel.findAll()
    }

    static async fetchOne(id: number) {
        return await PlaceModel.findOne({ where: { id: id } })
    }
}



export default Place;
