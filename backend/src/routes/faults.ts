import express from 'express'
import {addOneFault_POST_user, fetchAllFaultsOfACar_GET_user, fetchAllCarsWithNumberOfFaults_GET_user, fetchOneFault_GET_user, fetchAllFaultsOfUser_GET_user, deleteOneFault_DELETE_user} from '../controllers/faultsController';
const app = express.Router();


app.get('/numbers', fetchAllCarsWithNumberOfFaults_GET_user);
app.post('/cars/:carid', addOneFault_POST_user);
app.get('/cars/:carid', fetchAllFaultsOfACar_GET_user);
app.get('/users/:userid', fetchAllFaultsOfUser_GET_user);
app.get('/:faultid', fetchOneFault_GET_user);
app.delete('/:faultid', deleteOneFault_DELETE_user)


export default app;