import express, { NextFunction, Request, Response } from 'express'
import { addOneReservation} from '../controllers/reservationController';
const app = express.Router();


app.post('/add', addOneReservation);



export default app;