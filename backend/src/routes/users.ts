import express from 'express'
import { fetchAllUsers_GET_user, fetchOneUser_GET_user } from '../controllers/usersController';

const app = express.Router();

app.get('/:userid', fetchOneUser_GET_user);
app.get('/', fetchAllUsers_GET_user);




export default app;