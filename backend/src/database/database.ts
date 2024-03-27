import { Sequelize, DataTypes } from 'sequelize';

require('dotenv').config();
const sequelize = new Sequelize(`sqlite:${process.env.DB_FILE_LOCATION}`); //file location



export default sequelize;