import express from 'express'
import { fetchFavouriteCarOfUser_GET_user, fetchFavouritePlaceOfUser_GET_user, fetchTotalStatsOfUserInYear_GET_user, fetchTotalStatsOfUser_GET_user, fetchTotalTravelledDistanceByUserByCarTypes_GET_user, fetchTotalTravelledDistanceByUser_GET_user, fetchTotalTravelledDistanceForAllPlacesByUser_GET_user } from '../controllers/userStatsController';
import { fetchFavouriteCarOfPlace_GET_user, fetchFavouriteUserOfPlace_GET_user, fetchTotalStatsOfPlaceInYear_GET_user, fetchTotalStatsOfPlace_GET_user, fetchTotalTravelledDistanceByPlaceByCarTypes_GET_user, fetchTotalTravelledDistanceByPlace_GET_user, fetchTotalTravelledDistanceForAllCarsByPlace_GET_user, fetchTotalTravelledDistanceForAllUsersByPlace_GET_user } from '../controllers/placeStatsController';
import { fetchFavouritePlaceOfCar_GET_user, fetchFavouriteUserOfCar_GET_user, fetchFuelUsageForCarForTwoYears_GET_user, fetchTotalStatsOfCarInYear_GET_user, fetchTotalStatsOfCar_GET_user, fetchTotalTravelledDistanceByCar_GET_user, fetchTotalTravelledDistanceForAllPlacesByCar_GET_user, fetchTotalTravelledDistanceForAllUsersByCar_GET_user } from '../controllers/carsStatsController';
import { fetchHomepageUserData_GET_user } from '../controllers/generalStatsController';







const app = express.Router();

//homepage
app.get('/homepage/user/:userid', fetchHomepageUserData_GET_user);


//user
app.get('/users/:userid/total', fetchTotalStatsOfUser_GET_user);
app.get('/users/:userid/total/year/:year', fetchTotalStatsOfUserInYear_GET_user);
app.get('/users/:userid/distance', fetchTotalTravelledDistanceByUser_GET_user);
app.get('/users/:userid/distance/bycartypes', fetchTotalTravelledDistanceByUserByCarTypes_GET_user);
app.get('/users/:userid/distance/places', fetchTotalTravelledDistanceForAllPlacesByUser_GET_user);
app.get('/users/:userid/favourite/car', fetchFavouriteCarOfUser_GET_user);
app.get('/users/:userid/favourite/place', fetchFavouritePlaceOfUser_GET_user);



//place
app.get('/places/:placeid/total', fetchTotalStatsOfPlace_GET_user);
app.get('/places/:placeid/total/year/:year', fetchTotalStatsOfPlaceInYear_GET_user);
app.get('/places/:placeid/distance', fetchTotalTravelledDistanceByPlace_GET_user);
app.get('/places/:placeid/distance/bycartypes', fetchTotalTravelledDistanceByPlaceByCarTypes_GET_user);
app.get('/places/:placeid/distance/users', fetchTotalTravelledDistanceForAllUsersByPlace_GET_user);
app.get('/places/:placeid/distance/cars', fetchTotalTravelledDistanceForAllCarsByPlace_GET_user);
app.get('/places/:placeid/favourite/car', fetchFavouriteCarOfPlace_GET_user);
app.get('/places/:placeid/favourite/user', fetchFavouriteUserOfPlace_GET_user);




//car
app.get('/cars/:carid/total', fetchTotalStatsOfCar_GET_user);
app.get('/cars/:carid/total/year/:year', fetchTotalStatsOfCarInYear_GET_user);
app.get('/cars/:carid/distance', fetchTotalTravelledDistanceByCar_GET_user);
app.get('/cars/:carid/fuelusage/year/:year', fetchFuelUsageForCarForTwoYears_GET_user);
app.get('/cars/:carid/distance/places', fetchTotalTravelledDistanceForAllPlacesByCar_GET_user);
app.get('/cars/:carid/distance/users', fetchTotalTravelledDistanceForAllUsersByCar_GET_user);
app.get('/cars/:carid/favourite/user', fetchFavouriteUserOfCar_GET_user);
app.get('/cars/:carid/favourite/place', fetchFavouritePlaceOfCar_GET_user);




export default app;