import express, { NextFunction, Request, Response } from 'express'
import { addOneRentalByNormalUser, fetchAllRentalsOfUser, fetchLastRentalOfCar, returnCarByNormalUser, fetchOneRental } from '../controllers/rentalsController';
const app = express.Router();

app.get('/:rentalid', fetchOneRental)
app.post('/add', addOneRentalByNormalUser);
app.post('/returncar', returnCarByNormalUser);
app.get('/user/:userid', fetchAllRentalsOfUser)
app.get('/car/:carid/last', fetchLastRentalOfCar)



export default app;