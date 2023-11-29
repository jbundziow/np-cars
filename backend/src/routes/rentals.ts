import express, { NextFunction, Request, Response } from 'express'
import { addOneRentalByNormalUser, returnCarByNormalUser } from '../controllers/rentalsController';
const app = express.Router();


app.post('/add', addOneRentalByNormalUser);
app.post('/returncar', returnCarByNormalUser);



export default app;