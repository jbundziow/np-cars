import express from 'express'
import { addOneCar_POST_admin } from '../controllers/admin/carsController';
import { addOneRefueling_POST_admin, editOneRefueling_PUT_admin, deleteOneRefueling_DELETE_admin, acknowledgeOneRefueling_PUT_admin} from '../controllers/admin/refuelingController';

const app = express.Router();

app.post('/cars', addOneCar_POST_admin)


app.post('/refuelings/:carid', addOneRefueling_POST_admin);
app.put('/refuelings/:refuelingid', editOneRefueling_PUT_admin);
app.delete('/refuelings/:refuelingid', deleteOneRefueling_DELETE_admin);
app.put('/refuelings/confirm', acknowledgeOneRefueling_PUT_admin)

export default app;