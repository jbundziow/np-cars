import express, { NextFunction, Request, Response } from 'express'
import {addOneFault, fetchAllFaults, fetchAllCarsWithNumberOfFaults, test} from '../controllers/faultsController';
const app = express.Router();

app.get('/', fetchAllFaults);
app.post('/report/:id', addOneFault);

app.get('/getallfaultsofcar/:carid', fetchAllCarsWithNumberOfFaults);
app.get('/test', test);


export default app;