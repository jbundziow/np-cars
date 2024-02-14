import express from 'express'
import { fetchTotalTravelledDistanceByUser_GET_user } from '../controllers/statsController';


const app = express.Router();

app.get('/users/distance', fetchTotalTravelledDistanceByUser_GET_user);



export default app;