import express, { NextFunction, Request, Response } from 'express'
import { addOneReservation, test } from '../controllers/reservationController';
const app = express.Router();


app.post('/add', addOneReservation);
app.get('/test', test)



export default app;