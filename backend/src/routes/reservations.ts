import express, { NextFunction, Request, Response } from 'express'
import { addOneReservation, checkReservationsForAllCarsForTheNextTwoWeeks, checkReservationsForOneCarForTheNextTwoWeeks, findAllReservationsOfCar, findAllReservationsOfUser} from '../controllers/reservationController';
const app = express.Router();


app.post('/add', addOneReservation);
app.get('/checktwoweeksfor/:carid', checkReservationsForOneCarForTheNextTwoWeeks)
app.get('/checktwoweeksforallcars', checkReservationsForAllCarsForTheNextTwoWeeks)
app.get('/fetchallofcar/:carid', findAllReservationsOfCar)
app.get('/fetchallofuser/:userid', findAllReservationsOfUser)



export default app;