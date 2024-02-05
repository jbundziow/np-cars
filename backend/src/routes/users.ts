import express, { NextFunction, Request, Response } from 'express'
import { signUp, fetchAllUsers, fetchOneUser } from '../controllers/usersController';

const app = express.Router();

app.post('/signup', signUp);

app.get('/fetchall', fetchAllUsers);
app.get('/fetchone/:userid', fetchOneUser);



export default app;