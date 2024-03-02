import express from 'express'
import { addOneCar_POST_admin } from '../controllers/admin/carsController';
import { addOneRefueling_POST_admin } from '../controllers/admin/refuelingController';

const app = express.Router();

app.post('/cars', addOneCar_POST_admin)


app.post('/refuelings/:carid', addOneRefueling_POST_admin);

export default app;