const {DataTypes} = require('sequelize');
import { Op } from "sequelize";
import sequelize from "../database/database";






export const WrongLoginAttemptsModel = sequelize.define('WrongLoginAttempts', {
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
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    blockUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    }
)



//CONSTANT VARRIABLES
export const BLOCK_TIME = 5 * 60 * 1000;
export const MAX_ATTEMPTS = 5;









// const syncModel = async () => {
//   await WrongLoginAttemptsModel.sync({ force: true });
// }
// syncModel();







class WrongLoginAttempts {




    // constructor(
    //     private id: number | null,
    //     private userID: number,
    //     private date: Date,
    //     private blockUser: boolean,
    //     ) {}















    static async addOne(userID: number) {
        const attemptsInLast5Minutes = await WrongLoginAttemptsModel.count({
            where: {
                userID: userID,
                date: {
                    [Op.gt]: new Date(new Date().getTime() - BLOCK_TIME)
                }
            }
        })

        await WrongLoginAttemptsModel.create({
            // id: this.id,
            userID: userID,
            date: new Date(),
            blockUser: attemptsInLast5Minutes >= MAX_ATTEMPTS -1,
        })

        return MAX_ATTEMPTS - 1 - attemptsInLast5Minutes
    }





    











    static async isUserBlocked(userID: number) {
        const isUserBlocked = await WrongLoginAttemptsModel.findOne({
            where: {
                userID: userID,
                blockUser: true
            }
        })

        if(isUserBlocked) {
            if(new Date().getTime() - isUserBlocked.dataValues.date.getTime() < BLOCK_TIME) {
                return {result: true, unblockTime: new Date(isUserBlocked.dataValues.date.getTime() + BLOCK_TIME)}
            } else {
                await WrongLoginAttempts.deleteWrongAttemptsOfUser(userID);
                return {result: false, unblockTime: null}
            }
        } else {
            return {result: false, unblockTime: null}
        }
    }
















    static async deleteWrongAttemptsOfUser(userID: number) {
        return await WrongLoginAttemptsModel.destroy({where: {userID: userID}})
    }








  
}



export default WrongLoginAttempts;
