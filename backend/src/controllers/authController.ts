
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
import JWT_SECRET_KEY from '../config/JWT_SECRET_KEY';

import { NextFunction, Request, Response, response } from 'express'
import { signUpUserSchema } from '../models/validation/UserSchemas';

import User from '../models/User';


//create JWT
const maxAge = 60*60; //1h
const createToken = (id: number, role: 'unconfirmed' | 'banned' | 'admin' | 'user') => {
    return jwt.sign({id, role}, JWT_SECRET_KEY, {
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
        const assignedUserRole = result.dataValues.role;
        const token = createToken(assignedUserID, assignedUserRole);
        //TODO: MAKE SURE THAT IN PRODUCTION SECURE IS ENABLED
        res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV !== "dev", maxAge: maxAge * 1000 })
        res.status(200).json({status: 'success', data: {userID: assignedUserID, userRole: assignedUserRole}});
    }
    else {
        res.status(500).json({status: 'error', message: 'Error occured while adding user to the database.'})
    }
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}

export const login_POST = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    if(req.cookies.jwt) { //logout if user is already logged in
        res.cookie('jwt', '', { maxAge: 1 });
    }

    try {
        const loggedUser = await User.login(email, password);
        const token = createToken(loggedUser.dataValues.id, loggedUser.dataValues.role);
        //TODO: MAKE SURE THAT IN PRODUCTION SECURE IS ENABLED
        res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV !== "dev", maxAge: maxAge * 1000 })
        res.status(200).json({status: 'success', data: {userID: loggedUser.dataValues.id, userRole: loggedUser.dataValues.role}});
    }
    catch (err) {
        if((err as Error).message === 'incorrect email') {
            res.status(400).json({status: 'fail', data: [{en: 'This email address does not exist in the database.', pl: 'Ten adres email nie istnieje w bazie danych.'}]})
        }
        else if((err as Error).message === 'incorrect password') {
            res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong password. Try again.', pl: 'Nieprawidłowe hasło. Spróbuj ponownie.'}]})
        }
        else {
        res.status(500).json({status: 'error', message: err})
        }
    }
    
}

export const logout_GET = async (req: Request, res: Response, next: NextFunction) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({status: 'success', data: {}});
}