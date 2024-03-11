import express from 'express'
import { changeUserAvatar_PUT_user, deleteUserAvatar_DELETE_user, editOneUser_PUT_user, fetchAllUsers_GET_user, fetchOneUser_GET_user } from '../controllers/usersController';

import multer from 'multer';
import { storage, fileFilter, limits } from '../utilities/fileUpload/multerConfig';

const app = express.Router();

app.get('/:userid', fetchOneUser_GET_user);
app.get('/', fetchAllUsers_GET_user);
app.put('/:userid', editOneUser_PUT_user);

//avatar
app.put('/avatar/:userid', multer({ storage, fileFilter, limits }).single('image'), changeUserAvatar_PUT_user);
app.delete('/avatar/:userid', deleteUserAvatar_DELETE_user);




export default app;