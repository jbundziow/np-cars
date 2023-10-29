import express, { NextFunction, Request, Response } from 'express'
import { addOneCar } from '../controllers/admin/carsController';
const app = express.Router();

app.post('/cars/add', addOneCar)

export default app;