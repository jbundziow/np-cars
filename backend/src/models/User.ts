const {DataTypes} = require('sequelize');



import sequelize from "../database/database";
const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employedAs: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatarPath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM('admin', 'user', 'banned'),
        allowNull: false
      },
})


const syncModel = async () => {
  await UserModel.sync({ force: true });
}
syncModel();



class User {
    constructor(
        private id: number | null,
        private gender: 'male' | 'female',
        private name: string,
        private surname: string,
        private employedAs: string,
        private avatarPath: string | null,
        private role: 'admin' | 'user' | 'banned',
        ) {}

    async addOneUser() {
        await UserModel.create({
          id: this.id,
          gender: this.gender,
          name: this.name,
          surname: this.surname,
          employedAs: this.employedAs,
          avatarPath: this.avatarPath,
          role: this.role,
        })
    }

    static async fetchAll() {
        return await UserModel.findAll()
    }

    static async fetchOne(id: number) {
        return await UserModel.findOne({ where: { id: id } })
    }
}



export default User;
