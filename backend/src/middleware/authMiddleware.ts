const jwt = require('jsonwebtoken');
const User = require('../models/User');
import JWT_SECRET_KEY from '../config/JWT_SECRET_KEY';
import { NextFunction, Request, Response, response } from 'express'

export const requireAuthAsUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, JWT_SECRET_KEY, (err: Error, decodedToken: any) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({status: 'fail', data: [{en: `You don't have permissions to view that resource.`, pl: `Nie masz uprawnień do wyświetlenia tych zasobów.`}]})
        // res.redirect('/login');
      } else {
        console.log(decodedToken);
        if(decodedToken.role === 'user') {
          next()
        }
        else {
          res.status(400).json({status: 'fail', data: [{en: `You don't have permissions to view that resource.`, pl: `Nie masz uprawnień do wyświetlenia tych zasobów.`}]})
        }
        

      }
    });
  } else {
    res.status(400).json({status: 'fail', data: [{en: `You don't have permissions to view that resource.`, pl: `Nie masz uprawnień do wyświetlenia tych zasobów.`}]})
    // res.redirect('/login');
  }
};









// check current user
// export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, JWT_SECRET_KEY, async (err: Error, decodedToken: any) => {
//       if (err) {
//         res.locals.user = null;
//         next();
//       } else {
//         let user = await User.fetchOne(decodedToken.id);
//         res.locals.user = user;
//         next();
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
// };

