import express from 'express'
import { addOneRefueling_POST_user, fetchAllRefuelingsWithFilters_GET_user, fetchLastRefuelingAndFuelLevelOfAllCars_GET_user, deleteLastRefueling_GET_user } from '../controllers/refuelingController';
const app = express.Router();

app.get('/', fetchAllRefuelingsWithFilters_GET_user);
app.delete('/', deleteLastRefueling_GET_user);
app.post('/:carid', addOneRefueling_POST_user);


app.get('/cars/level', fetchLastRefuelingAndFuelLevelOfAllCars_GET_user)



export default app;