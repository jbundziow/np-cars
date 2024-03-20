import express from 'express'
import { fetchTotalStatsOfUser_GET_user, fetchTotalTravelledDistanceByUser_GET_user } from '../controllers/statsController';


const app = express.Router();

app.get('/users/:userid/total', fetchTotalStatsOfUser_GET_user);
app.get('/users/:userid/distance', fetchTotalTravelledDistanceByUser_GET_user);




export default app;