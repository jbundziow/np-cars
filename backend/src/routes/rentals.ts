import express, { NextFunction, Request, Response } from 'express'
import { addOneRentalByNormalUser, fetchAllRentalsOfUser, returnCarByNormalUser } from '../controllers/rentalsController';
const app = express.Router();


app.post('/add', addOneRentalByNormalUser);
app.post('/returncar', returnCarByNormalUser);
app.get('/user/:userid', fetchAllRentalsOfUser)



export default app;