import express, { NextFunction, Request, Response } from 'express'
import { fetchAllUsers, fetchOneUser } from '../controllers/usersController';

const app = express.Router();


app.get('/fetchall', fetchAllUsers);
app.get('/fetchone/:userid', fetchOneUser);



export default app;