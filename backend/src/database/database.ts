import { Sequelize, DataTypes } from 'sequelize';


const sequelize = new Sequelize('sqlite:./src/database/database.db');
const User = sequelize.define('User', {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});

// sequelize.query('SELECT * from Users')

const xd = async () => {
//     const jane = await User.create({
//         username: 'janedoe',
//         birthday: new Date(1980, 6, 20),
//       });
      
      const users = await User.findAll();
      console.log(users);
}

xd();

// const jane = await User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20),
//   });
  
//   const users = await User.findAll();
//   console.log(users);

// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./src/database/np-cars.db');

// db.serialize(() => {
//     db.run("CREATE TABLE lorem (info TEXT)");

//     const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//     for (let i = 0; i < 10; i++) {
//         stmt.run("Ipsum " + i);
//     }
//     stmt.finalize();

//     db.each("SELECT rowid AS id, info FROM lorem", (err: any, row: any) => {
//         console.log(row.id + ": " + row.info);
//     });
// });

// db.close();

export default User;