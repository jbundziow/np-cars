import express, { NextFunction, Request, Response } from 'express'
import {addOneFault, fetchAllFaultsOfACar, fetchAllCarsWithNumberOfFaults, fetchOneFault, fetchAllFaultsOfUser} from '../controllers/faultsController';
const app = express.Router();


app.post('/report/:carid', addOneFault);

app.get('/fetchone/:faultid', fetchOneFault);
app.get('/getall/:carid', fetchAllFaultsOfACar);
app.get('/getnumbers', fetchAllCarsWithNumberOfFaults);
app.get('/fetchallofuser/:userid', fetchAllFaultsOfUser);


export default app;