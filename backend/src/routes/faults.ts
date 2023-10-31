import express, { NextFunction, Request, Response } from 'express'
import {addOneFault, fetchAllFaults, fetchAllFaultsOfACar, fetchAllCarsWithNumberOfFaults} from '../controllers/faultsController';
const app = express.Router();

app.get('/', fetchAllFaults);
app.post('/report/:id', addOneFault);

app.get('/getallfaultsofcar/:carid', fetchAllFaultsOfACar);


export default app;