import express, { NextFunction, Request, Response } from 'express'
import { addOneReservation, checkReservationsForOneCarForTheNextTwoWeeks} from '../controllers/reservationController';
const app = express.Router();


app.post('/add', addOneReservation);
app.get('/checktwoweeksfor/:carid', checkReservationsForOneCarForTheNextTwoWeeks)



export default app;