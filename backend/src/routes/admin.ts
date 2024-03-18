import express from 'express'
import { addOneCar_POST_admin, editOneCar_PUT_admin, deleteOneCar_DELETE_admin } from '../controllers/admin/carsController';
import { addOneRefueling_POST_admin, editOneRefueling_PUT_admin, deleteOneRefueling_DELETE_admin, acknowledgeOneRefueling_PUT_admin} from '../controllers/admin/refuelingController';
import { acknowledgeOneFault_PUT_admin, deleteOneFault_DELETE_admin, editOneFault_PUT_admin, fetchAllFaultsByStatus_GET_admin } from '../controllers/admin/faultsController';
import { addOneReservation_POST_admin, editOneReservation_PUT_admin } from '../controllers/admin/reservationsController';
import { addOnePlace_POST_admin, deleteOnePlace_PUT_admin, editOnePlace_PUT_admin } from '../controllers/admin/placesController';
import { acknowledgeOneUser_PUT_admin, deleteOneUser_DELETE_admin, editOneUser_PUT_admin } from '../controllers/admin/usersController';

import multer from 'multer';
import { storage, fileFilter, limits } from '../utilities/fileUpload/multerConfig';
import { addOneRentalAsAdmin_POST_admin, deleteOneRental_DELETE_admin, editOneRental_PUT_admin } from '../controllers/admin/rentalsController';

const app = express.Router();

//cars
app.post('/cars', multer({ storage, fileFilter, limits }).single('image'), addOneCar_POST_admin)
app.put('/cars/:carid', multer({ storage, fileFilter, limits }).single('image'), editOneCar_PUT_admin)
app.delete('/cars/:carid', deleteOneCar_DELETE_admin)



//rentals
app.post('/rentals', addOneRentalAsAdmin_POST_admin);
app.put('/rentals/:rentalid', editOneRental_PUT_admin);
app.delete('/rentals/:rentalid', deleteOneRental_DELETE_admin);



//reservations
app.post('/reservations', addOneReservation_POST_admin);
app.put('/reservations/:reservationid', editOneReservation_PUT_admin);



//refuelings
app.post('/refuelings/:carid', addOneRefueling_POST_admin);
app.put('/refuelings/:refuelingid', editOneRefueling_PUT_admin);
app.delete('/refuelings/:refuelingid', deleteOneRefueling_DELETE_admin);
app.put('/refuelings/confirm', acknowledgeOneRefueling_PUT_admin)



//faults
app.get('/faults', fetchAllFaultsByStatus_GET_admin)
app.put('/faults/confirm', acknowledgeOneFault_PUT_admin)
app.put('/faults/:faultid', editOneFault_PUT_admin);
app.delete('/faults/:faultid', deleteOneFault_DELETE_admin)


//places
app.post('/places', addOnePlace_POST_admin)
app.put('/places/:placeid', editOnePlace_PUT_admin)
app.delete('/places/:placeid', deleteOnePlace_PUT_admin)


//users
app.put('/users/confirm', acknowledgeOneUser_PUT_admin)
app.put('/users/:userid', editOneUser_PUT_admin)
app.delete('/users/:userid', deleteOneUser_DELETE_admin)



export default app;