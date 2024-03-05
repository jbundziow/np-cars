import express from 'express'
import { addOneCar_POST_admin } from '../controllers/admin/carsController';
import { addOneRefueling_POST_admin, editOneRefueling_PUT_admin, deleteOneRefueling_DELETE_admin, acknowledgeOneRefueling_PUT_admin} from '../controllers/admin/refuelingController';
import { acknowledgeOneFault_PUT_admin, deleteOneFault_DELETE_admin, editOneFault_PUT_admin } from '../controllers/admin/faultsController';

const app = express.Router();

//cars
app.post('/cars', addOneCar_POST_admin)



//refuelings
app.post('/refuelings/:carid', addOneRefueling_POST_admin);
app.put('/refuelings/:refuelingid', editOneRefueling_PUT_admin);
app.delete('/refuelings/:refuelingid', deleteOneRefueling_DELETE_admin);
app.put('/refuelings/confirm', acknowledgeOneRefueling_PUT_admin)



//faults
app.put('/faults/confirm', acknowledgeOneFault_PUT_admin)
app.put('/faults/:faultid', editOneFault_PUT_admin);
app.delete('/faults/:faultid', deleteOneFault_DELETE_admin)


export default app;