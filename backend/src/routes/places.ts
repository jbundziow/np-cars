import express from 'express'
import { fetchAllPlacesWithFilters_GET_user, fetchOnePlace_GET_user } from '../controllers/placesController';







const app = express.Router();

app.get('/', fetchAllPlacesWithFilters_GET_user)
app.get('/:placeid', fetchOnePlace_GET_user)


export default app;