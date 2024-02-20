import express from 'express'
import { addOneRental_POST_user, fetchAllRentalsOfUser_GET_user, fetchLastRentalOfCar_GET_user, returnCar_POST_user, fetchOneRental_GET_user} from '../controllers/rentalsController';
const app = express.Router();


app.post('/', addOneRental_POST_user);
app.post('/return', returnCar_POST_user);
app.get('/users/:userid', fetchAllRentalsOfUser_GET_user)
app.get('/cars/:carid/last', fetchLastRentalOfCar_GET_user)
app.get('/:rentalid', fetchOneRental_GET_user)



export default app;