import express from 'express'
import { addOneReservation_POST_user, deleteOneReservation_DELETE_user, checkReservationsForAllCarsForTheNextTwoWeeks_GET_user, checkReservationsForOneCarForTheNextTwoWeeks_GET_user, findAllReservationsOfCar_GET_user, findAllReservationsOfUser_GET_user, fetchAllReservationsWithFilters_GET_user, fetchOneReservation_GET_user} from '../controllers/reservationController';
const app = express.Router();

app.get('/', fetchAllReservationsWithFilters_GET_user);
app.get('/:reservationid', fetchOneReservation_GET_user);
app.post('/', addOneReservation_POST_user);
app.delete('/', deleteOneReservation_DELETE_user);

app.get('/twoweeks/cars', checkReservationsForAllCarsForTheNextTwoWeeks_GET_user)
app.get('/twoweeks/cars/:carid', checkReservationsForOneCarForTheNextTwoWeeks_GET_user)
app.get('/cars/:carid', findAllReservationsOfCar_GET_user)
app.get('/users/:userid', findAllReservationsOfUser_GET_user)



export default app;