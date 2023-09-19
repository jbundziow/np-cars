import express, { NextFunction, Request, Response } from 'express'
import { fetchAllCars } from '../controllers/carsController';
const app = express.Router();

app.get('/', fetchAllCars)

export default app;