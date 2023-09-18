import { Sequelize, DataTypes } from 'sequelize';


const sequelize = new Sequelize('sqlite:./src/database/database.db'); //file location

export default sequelize;