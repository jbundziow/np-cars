import express, { NextFunction, Request, Response } from 'express'
import {addOneFault, fetchAllCarsWithNumberOfFaults} from '../controllers/faultsController';
const app = express.Router();


app.post('/report/:id', addOneFault);

app.get('/getnumbers', fetchAllCarsWithNumberOfFaults);


export default app;