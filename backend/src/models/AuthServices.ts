const {DataTypes} = require('sequelize');
const bcrypt = require('bcrypt')
import { Op } from "sequelize";
import sequelize from "../database/database";










type serviceType = 'password_change' | 'email_change';





export const AuthServicesModel = sequelize.define('AuthServices', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
      },
    // ...

    type: {
        type: DataTypes.ENUM('password_change', 'email_change'),
        allowNull: false
    },
    sendTo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resendAvailableAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tokenExpiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
})


// const syncModel = async () => {
//   await AuthServicesModel.sync({ force: true });
// }
// syncModel();



class AuthServices {
    constructor(
        private id: number | null,
        private userID: number,
        private type: serviceType,
        private sendTo: string,
        private resendAvailableAt: Date,
        private token: string,
        private tokenExpiresAt: Date
        ) {}









    async addOneRequest() {
        return await AuthServicesModel.create({
            // id: this.id,
            userID: this.userID,
            type: this.type,
            sendTo: this.sendTo,
            resendAvailableAt: this.resendAvailableAt,
            token: this.token,
            tokenExpiresAt: this.tokenExpiresAt
        })
    }








    static async findLastActiveTokenOfUser(userID: number, email: string, type: serviceType) {
        return await AuthServicesModel.findOne({
            where: {
                userID: userID,
                sendTo: email,
                type: type,
                tokenExpiresAt: {
                    [Op.gt]: new Date()
                }
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
    }








    static async changeResendAvailableAt(id: number, newDate: Date) {
        return await AuthServicesModel.update({resendAvailableAt: newDate}, {
            where: {
                id: id
            }
        })
    }






  
}



export default AuthServices;
