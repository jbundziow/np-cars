import express from 'express'
import { addOneRental_POST_user, fetchAllRentalsOfUser_GET_user, fetchLastRentalOfCar_GET_user, returnCar_POST_user, fetchOneRental_GET_user, fetchAllRentalsWithFilters_GET_user, fetchAllPendingRentals_GET_user, fetchMileageGaps_GET_user, deleteLastRental_DELETE_user} from '../controllers/rentalsController';









const app = express.Router();

app.get('/', fetchAllRentalsWithFilters_GET_user)
app.get('/pending', fetchAllPendingRentals_GET_user)
app.post('/', addOneRental_POST_user);
app.post('/return', returnCar_POST_user);
app.get('/users/:userid', fetchAllRentalsOfUser_GET_user)
app.get('/cars/:carid/last', fetchLastRentalOfCar_GET_user)
app.get('/gaps', fetchMileageGaps_GET_user)
app.get('/:rentalid', fetchOneRental_GET_user)
app.delete('/:rentalid', deleteLastRental_DELETE_user)




export default app;