import express, { NextFunction, Request, Response } from 'express'
import { addOneCar } from '../controllers/admin/carsController';

const app = express.Router();

app.post('/cars/add', addOneCar)


//TODO: update refueling
//TODO: acknowledge refueling

export default app;