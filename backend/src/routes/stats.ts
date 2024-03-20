import express from 'express'
import { fetchTotalStatsOfUserInYear_GET_user, fetchTotalStatsOfUser_GET_user, fetchTotalTravelledDistanceByUser_GET_user } from '../controllers/statsController';


const app = express.Router();

//user
app.get('/users/:userid/total', fetchTotalStatsOfUser_GET_user);
app.get('/users/:userid/total/year/:year', fetchTotalStatsOfUserInYear_GET_user);
app.get('/users/:userid/distance', fetchTotalTravelledDistanceByUser_GET_user);
// app.get('/users/:userid/distance/bycartypes', );
// app.get('/users/:userid/distance/places', );
// app.get('/users/:userid/favourite/car', );
// app.get('/users/:userid/favourite/place', );




export default app;