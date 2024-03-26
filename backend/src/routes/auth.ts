import express from 'express'
import { signup_POST_public, login_POST_public, logout_GET_public, changePasswordRequest_POST_public, changePassword_PUT_public, changeEmail_PUT_public, changeEmailRequest_POST_public } from '../controllers/authController';
import { requireAuthAsUser } from '../middleware/authMiddleware';








const app = express.Router();

app.post('/signup', signup_POST_public);
app.post('/login', login_POST_public);
app.get('/logout', logout_GET_public);


//auth services
app.post('/password_reset_request', changePasswordRequest_POST_public);
app.put('/password_reset', changePassword_PUT_public);
app.post('/email_change_request', requireAuthAsUser, changeEmailRequest_POST_public); //login required
app.put('/email_change', changeEmail_PUT_public);


export default app;