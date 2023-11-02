import express, { NextFunction, Request, Response } from 'express'
import { addOneRefueling } from '../controllers/refuelingController';
const app = express.Router();


app.post('/report/:carid', addOneRefueling);



export default app;