import express from 'express'
import { addOneRefueling_POST_user } from '../controllers/refuelingController';
const app = express.Router();


app.post('/:carid', addOneRefueling_POST_user);



export default app;