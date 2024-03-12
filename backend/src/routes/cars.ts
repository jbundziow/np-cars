import express from 'express'
import { fetchAllCars_GET_user, fetchMileageGaps_GET_user, fetchOneCar_GET_user } from '../controllers/carsController';
const app = express.Router();
app.get('/gaps', fetchMileageGaps_GET_user)
app.get('/', fetchAllCars_GET_user)
app.get('/:carid', fetchOneCar_GET_user)

export default app;