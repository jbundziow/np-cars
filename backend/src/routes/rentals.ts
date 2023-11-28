import express, { NextFunction, Request, Response } from 'express'
import { addOneRentalByNormalUser } from '../controllers/rentalsController';
const app = express.Router();


app.post('/add', addOneRentalByNormalUser);



export default app;