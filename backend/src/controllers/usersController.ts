
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
import JWT_SECRET_KEY from '../config/JWT_SECRET_KEY';

import { NextFunction, Request, Response, response } from 'express'
import { signUpUserSchema } from '../models/validation/UserSchemas';

import User from '../models/User';


//create JWT
const maxAge = 60*60; //1h
const createToken = (id: number) => {
    return jwt.sign({id}, JWT_SECRET_KEY, {
        expiresIn: maxAge
    });
}



export const signup_POST = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    try {
    const newUser = new User(null, data.email.toLowerCase(), data.password, data.gender, data.name, data.surname, data.employedAs, data.avatarPath, 'unconfirmed');
    await signUpUserSchema.validateAsync(newUser);

    //hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    newUser.changePassword(hashedPassword);

    const result = await newUser.addOneUser();
    if(result) {
        const assignedUserID = result.dataValues.id;
        const token = createToken(assignedUserID);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({status: 'success', data: {userID: assignedUserID}});
    }
    else {
        res.status(500).json({status: 'error', message: 'Error occured while adding user to the database.'})
    }
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}

export const logout_GET = async (req: Request, res: Response, next: NextFunction) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({status: 'success', data: {}});
}








export const fetchAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await User.fetchAll();
        res.json({status: 'success', data: data});
    }
    catch(e) {
        res.status(500).json({status: 'error', message: e})
    }
}

export const fetchOneUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.userid);
    if (!isNaN(Number(req.params.userid))) {
        try {
            const data = await User.fetchOne(Number(req.params.userid));
            res.status(200).json({status: 'success', data: data})
        }
        catch(err) {
            res.status(500).json({status: 'error', message: err})
        }
    }
    else {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
    }   

}
