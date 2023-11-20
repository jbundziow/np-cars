import express, { NextFunction, Request, Response } from 'express'
import { addOneRental } from '../controllers/rentalsController';
const app = express.Router();


app.post('/add', addOneRental);



export default app;