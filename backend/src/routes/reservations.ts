import express, { NextFunction, Request, Response } from 'express'
import { addOneReservation, test, test2 } from '../controllers/reservationController';
const app = express.Router();


app.post('/add', addOneReservation);
app.get('/test', test)
app.get('/test2', test2)



export default app;