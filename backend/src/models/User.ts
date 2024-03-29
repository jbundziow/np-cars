const {DataTypes} = require('sequelize');
const bcrypt = require('bcrypt')
import { Op } from "sequelize";
import sequelize from "../database/database";
import WrongLoginAttempts from "./WrongLoginAttempts";









export const UserModel = sequelize.define('User', {
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
        private email: string | null,
        private password: string | null,
        private gender: 'male' | 'female',
        private name: string,
        private surname: string,
        private employedAs: string,
        private avatarPath: string | null,
        private role: 'unconfirmed' | 'banned' | 'admin' | 'user' | null,
        ) {}









    async addOneUser() {
        return await UserModel.create({
          // id: this.id,
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











    async editOneUserAsAdmin() {
      try {
      return await UserModel.update({
        // id: this.id,
        // email: this.email,
        // password: this.password,
        gender: this.gender,
        name: this.name,
        surname: this.surname,
        employedAs: this.employedAs,
        // avatarPath: this.avatarPath,
        role: this.role,
      },
      {where: {id: this.id}})
    }
    catch(e) {
      console.log(e);
    }
  }













  async editOneUserAsUser() {
    return await UserModel.update({
      // id: this.id,
      // email: this.email,
      // password: this.password,
      gender: this.gender,
      name: this.name,
      surname: this.surname,
      employedAs: this.employedAs,
      // avatarPath: this.avatarPath,
      // role: this.role,
    },
    {where: {id: this.id}})
}













static async changeAvatarPath(userID: number, avatarPath: string | null) {
  return await UserModel.update({
    avatarPath: avatarPath
  },
  {where: {id: userID}}
  );
}












  static async acknowledgeUserByModerator(userID: number) {
    return await UserModel.update({
      role: 'user'
    },
    {where: {id: userID}},
    );
  }










  static async deleteUser(id: number): Promise<boolean> {
    try {
      const user = await User.fetchOne(id, true);

      if (user) {
        await user.destroy();
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








  

    changePassword(hashedPassword: string) {
      this.password = hashedPassword;
    }

    static async fetchAll(showBanned: boolean) {
      if(showBanned) {
        return await UserModel.findAll({attributes: { exclude: ['password'] }})
      }
      else {
        return await UserModel.findAll({ attributes: { exclude: ['password'] }, where: {role: {[Op.notIn]: ['banned', 'unconfirmed']} } });
      }
        
    }












    static async fetchOne(id: number, showBanned: boolean) {
      if(showBanned) {
        return await UserModel.findOne({ where: { id: id }, attributes: { exclude: ['password'] } })
      }
      else {
        return await UserModel.findOne({ where: { id: id, role: { [Op.notIn]: ['banned', 'unconfirmed'] } }, attributes: { exclude: ['password'] } })
      }
        
    }










    
    static async login(email: string, password: string) {
      const user = await UserModel.findOne({where: {email: email}});
      if(user) {
        const {result, unblockTime} = await WrongLoginAttempts.isUserBlocked(user.dataValues.id);
        if(result === true) {
          return {result: false, reason: 'user_blocked', attemptsLeft: null, user: null, unblockTime: unblockTime}
        }

        const auth = await bcrypt.compare(password, user.dataValues.password)
        if(auth) {
          return {result: true, reason: 'success', attemptsLeft: null, user: user, unblockTime: null}
        }
        else {
          const attemptesLeft = await WrongLoginAttempts.addOne(user.dataValues.id);
          return {result: false, reason: 'incorrect_password', attemptsLeft: attemptesLeft, user: null, unblockTime: null}
        }
      }
      else {
        return {result: false, reason: 'incorrect_email', attemptsLeft: null, user: null, unblockTime: null}
      }
    }

  


  
}



export default User;
