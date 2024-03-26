const jwt = require('jsonwebtoken');
import { NextFunction, Request, Response, response } from 'express'















export const requireAuthAsUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err: Error, decodedToken: any) => {
      if (err) {
        console.log(err.message);
        res.status(401).json({status: 'fail', data: [{en: `You don't have permissions to view that resource. Please log in again.`, pl: `Nie masz uprawnień do wyświetlenia tych zasobów. Zaloguj się ponownie.`}]})
      } else {
        if(decodedToken.role === 'user' || decodedToken.role === 'admin') {
          next()
        }
        else {
          res.status(403).json({status: 'fail', data: [{en: `You don't have permissions to view that resource. Please log in again.`, pl: `Nie masz uprawnień do wyświetlenia tych zasobów. Zaloguj się ponownie.`}]})
        }
        

      }
    });
  } else {
    res.status(401).json({status: 'fail', data: [{en: `You don't have permissions to view that resource. Please log in again.`, pl: `Nie masz uprawnień do wyświetlenia tych zasobów. Zaloguj się ponownie.`}]})
  }
};





















export const requireAuthAsAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err: Error, decodedToken: any) => {
      if (err) {
        console.log(err.message);
        res.status(401).json({status: 'fail', data: [{en: `You don't have permissions to view that resource. Please log in again.`, pl: `Nie masz uprawnień do wyświetlenia tych zasobów. Zaloguj się ponownie.`}]})
      } else {
        if(decodedToken.role === 'admin') {
          next()
        }
        else {
          res.status(403).json({status: 'fail', data: [{en: `You don't have permissions to view that resource. Please log in again.`, pl: `Nie masz uprawnień do wyświetlenia tych zasobów. Zaloguj się ponownie.`}]})
        }
        

      }
    });
  } else {
    res.status(401).json({status: 'fail', data: [{en: `You don't have permissions to view that resource. Please log in again.`, pl: `Nie masz uprawnień do wyświetlenia tych zasobów. Zaloguj się ponownie.`}]})
  }
};
