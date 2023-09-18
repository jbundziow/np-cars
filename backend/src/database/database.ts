import { Sequelize, DataTypes } from 'sequelize';


const sequelize = new Sequelize('sqlite:./src/database/database.db');


// sequelize.query('SELECT * from Users')

const xd = async () => {


      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}



xd();

export default sequelize;
