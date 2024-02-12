import express from 'express'
import { addOneCar_POST_admin } from '../controllers/admin/carsController';

const app = express.Router();

app.post('/cars', addOneCar_POST_admin)


//TODO: update refueling
//TODO: acknowledge refueling

export default app;