const {DataTypes} = require('sequelize');
const bcrypt = require('bcrypt')
import sequelize from "../database/database";

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.ENUM('unconfirmed', 'admin', 'user', 'banned'),
      allowNull: false
    },
})


// const syncModel = async () => {
//   await UserModel.sync({ force: true });
// }
// syncModel();



class User {
    constructor(
        private id: number | null,
        private email: string,
        private password: string,
        private gender: 'male' | 'female',
        private name: string,
        private surname: string,
        private employedAs: string,
        private avatarPath: string | null,
        private role: 'unconfirmed' | 'banned' | 'admin' | 'user',
        ) {}

    async addOneUser() {
        return await UserModel.create({
          id: this.id,
          email: this.email,
          password: this.password,
          gender: this.gender,
          name: this.name,
          surname: this.surname,
          employedAs: this.employedAs,
          avatarPath: this.avatarPath,
          role: this.role,
        })
    }

    changePassword(hashedPassword: string) {
      this.password = hashedPassword;
    }

    static async fetchAll() {
        return await UserModel.findAll()
    }

    static async fetchOne(id: number) {
        return await UserModel.findOne({ where: { id: id } })
    }

    static async login(email: string, password: string) {
      const user = await UserModel.findOne({where: {email: email}});
      if(user) {
        const auth = await bcrypt.compare(password, user.dataValues.password)
        if(auth) {
          return user;
        }
        else {
          throw Error('incorrect password')
        }
      }
      else {
        throw Error('incorrect email')
      }
    }

  


  
}



export default User;
