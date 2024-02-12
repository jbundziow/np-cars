import express from 'express'

import { signup_POST_public, login_POST_public, logout_GET_public } from '../controllers/authController';

const app = express.Router();

app.post('/signup', signup_POST_public);
app.post('/login', login_POST_public);
app.get('/logout', logout_GET_public);


export default app;