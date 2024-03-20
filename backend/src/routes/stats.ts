import express from 'express'
import { fetchFavouriteCarOfUser_GET_user, fetchFavouritePlaceOfUser_GET_user, fetchTotalStatsOfUserInYear_GET_user, fetchTotalStatsOfUser_GET_user, fetchTotalTravelledDistanceByUserByCarTypes_GET_user, fetchTotalTravelledDistanceByUser_GET_user, fetchTotalTravelledDistanceForAllPlacesByUser_GET_user } from '../controllers/userStatsController';


const app = express.Router();

//user
app.get('/users/:userid/total', fetchTotalStatsOfUser_GET_user);
app.get('/users/:userid/total/year/:year', fetchTotalStatsOfUserInYear_GET_user);
app.get('/users/:userid/distance', fetchTotalTravelledDistanceByUser_GET_user);
app.get('/users/:userid/distance/bycartypes', fetchTotalTravelledDistanceByUserByCarTypes_GET_user);
app.get('/users/:userid/distance/places', fetchTotalTravelledDistanceForAllPlacesByUser_GET_user);
app.get('/users/:userid/favourite/car', fetchFavouriteCarOfUser_GET_user);
app.get('/users/:userid/favourite/place', fetchFavouritePlaceOfUser_GET_user);




export default app;