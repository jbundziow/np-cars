import express, { NextFunction, Request, Response } from 'express'
import {addOneFault, fetchAllFaults, getAllFaultsOfACar} from '../controllers/faultsController';
const app = express.Router();

app.get('/', fetchAllFaults);
app.post('/report/:id', addOneFault);

app.get('/getallfaultsofcar/:carid', getAllFaultsOfACar);


export default app;