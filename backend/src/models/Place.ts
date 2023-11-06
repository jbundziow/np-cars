const {DataTypes} = require('sequelize');



import sequelize from "../database/database";
const PlaceModel = sequelize.define('User', {
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
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('visible', 'unvisible'),
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
        private fullname: string,
        private status: 'visible' | 'unvisible',
        ) {}

    async addOnePlace() {
        await PlaceModel.create({
          id: this.id,
          projectCode: this.projectCode,
          fullname: this.fullname,
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
