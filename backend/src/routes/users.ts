import express from 'express'
import { editOneUser_PUT_user, fetchAllUsers_GET_user, fetchOneUser_GET_user } from '../controllers/usersController';

const app = express.Router();

app.get('/:userid', fetchOneUser_GET_user);
app.get('/', fetchAllUsers_GET_user);
app.put('/:userid', editOneUser_PUT_user);




export default app;