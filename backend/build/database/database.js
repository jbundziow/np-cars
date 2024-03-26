"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require('dotenv').config();
const sequelize = new sequelize_1.Sequelize(`sqlite:${process.env.DB_FILE_LOCATION}`); //file location
exports.default = sequelize;
