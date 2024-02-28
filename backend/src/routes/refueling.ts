import express from 'express'
import { addOneRefueling_POST_user, fetchAllRefuelingsWithFilters_GET_user } from '../controllers/refuelingController';
const app = express.Router();

app.get('/:', fetchAllRefuelingsWithFilters_GET_user);
app.post('/:carid', addOneRefueling_POST_user);



export default app;