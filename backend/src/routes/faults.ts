import express, { NextFunction, Request, Response } from 'express'
import {addOneFault, fetchAllFaultsOfACar, fetchAllCarsWithNumberOfFaults, fetchOneFault} from '../controllers/faultsController';
const app = express.Router();


app.post('/report/:id', addOneFault);

app.get('/fetchone/:faultid', fetchOneFault);
app.get('/getall/:carid', fetchAllFaultsOfACar);
app.get('/getnumbers', fetchAllCarsWithNumberOfFaults);


export default app;