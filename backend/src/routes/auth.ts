import express from 'express'

import { signup_POST, login_POST, logout_GET } from '../controllers/authController';

const app = express.Router();

app.post('/signup', signup_POST);
app.post('/login', login_POST);
app.get('/logout', logout_GET);


export default app;