import express, { NextFunction, Request, Response } from 'express'
import { signup_POST, logout_GET, fetchAllUsers, fetchOneUser } from '../controllers/usersController';

const app = express.Router();

app.post('/signup', signup_POST);
app.get('/logout', logout_GET)

app.get('/fetchall', fetchAllUsers);
app.get('/fetchone/:userid', fetchOneUser);



export default app;