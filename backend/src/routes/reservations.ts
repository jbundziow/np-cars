import express, { NextFunction, Request, Response } from 'express'
import { addOneReservation, checkReservationsForAllCarsForTheNextTwoWeeks, checkReservationsForOneCarForTheNextTwoWeeks} from '../controllers/reservationController';
const app = express.Router();


app.post('/add', addOneReservation);
app.get('/checktwoweeksfor/:carid', checkReservationsForOneCarForTheNextTwoWeeks)
app.get('/checktwoweeksforallcars', checkReservationsForAllCarsForTheNextTwoWeeks)



export default app;