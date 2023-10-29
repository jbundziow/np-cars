import express, { NextFunction, Request, Response } from 'express'
import { addOneFault, fetchAllFaults } from '../controllers/faultsController';
const app = express.Router();

app.get('/', fetchAllFaults);
app.post('/report/:id', addOneFault);


export default app;