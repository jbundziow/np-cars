import express from 'express'
import { fetchAllPlaces_GET_user } from '../controllers/placesController';

const app = express.Router();

app.get('/', fetchAllPlaces_GET_user)


export default app;