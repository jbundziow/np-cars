import express, { NextFunction, Request, Response } from 'express'
import { addOneCar } from '../controllers/admin/carsController';
import { addOneUser } from '../controllers/admin/usersController';
const app = express.Router();

app.post('/cars/add', addOneCar)
app.post('/users/add', addOneUser)

//TODO: update refueling
//TODO: acknowledge refueling

export default app;