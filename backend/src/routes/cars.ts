import express, { NextFunction, Request, Response } from 'express'
import { fetchAllCars, fetchOneCar } from '../controllers/carsController';
const app = express.Router();

app.get('/', fetchAllCars)
app.get('/:carid', fetchOneCar)

export default app;