
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
import {JWT_ACCESS_TOKEN_SECRET_KEY, JWT_REFRESH_TOKEN_SECRET_KEY} from '../config/JWT_SECRET_KEYS';

import { NextFunction, Request, Response, response } from 'express'
import { signUpUserSchema } from '../models/validation/UserSchemas';

import User from '../models/User';


//create JWT token
const createToken = (id: number, role: 'unconfirmed' | 'banned' | 'admin' | 'user', maxAgeAsSeconds: number, JWT_SECRET_KEY: string) => {
    return jwt.sign({id, role}, JWT_SECRET_KEY, {
        expiresIn: maxAgeAsSeconds
    });
}



export const signup_POST = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    try {
    const newUser = new User(null, data.email.toLowerCase(), data.password, data.gender, data.name, data.surname, data.employedAs, null, 'unconfirmed', null);
    await signUpUserSchema.validateAsync(newUser);

    //hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    newUser.changePassword(hashedPassword);

    const result = await newUser.addOneUser();
    if(result) {
        // const assignedUserID = result.dataValues.id;
        // const assignedUserRole = result.dataValues.role;
        // const token = createToken(assignedUserID, assignedUserRole);
        //TODO: MAKE SURE THAT IN PRODUCTION SECURE IS ENABLED
        // res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV !== "dev", maxAge: maxAge * 1000 })
        res.status(200).json({status: 'success', data: {}});
    }
    else {
        res.status(500).json({status: 'error', message: 'Error occured while adding user to the database.'})
    }
    }
    catch (err: any) {
        if(Array.isArray(err.errors) && err.errors[0].message) {
        if(err.errors[0].message === 'email must be unique') {
            res.status(400).json({status: 'fail', data: [{en: 'The user of this email already exist in the database.', pl: 'Użytkownik o tym adresie email już istnieje w bazie danych.'}]})
        }
        else {
            res.status(400).json({status: 'fail', data: [{en: 'Database error occured.', pl: 'Wystąpił błąd bazy danych.'}]})
        }
        }
        else if(Array.isArray(err.details) && err.details[0].message) {
            res.status(400).json({status: 'fail', data: [{en: 'A data validation error occurred. Check if they are correct and try again.', pl: 'Wystąpił błąd walidacji danych. Sprawdź czy są one poprawne i spróbuj ponownie.'}]})
        }
        else {
            res.status(500).json({status: 'error', message: err})
        }
    }
}

export const login_POST = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    if(req.cookies.jwt) { //logout if user is already logged in
        res.cookie('jwt', '', { maxAge: 1 });
    }

    try {
        const loggedUser = await User.login(email, password);
        const accessToken = createToken(loggedUser.dataValues.id, loggedUser.dataValues.role, 10, JWT_ACCESS_TOKEN_SECRET_KEY);
        const refreshToken = createToken(loggedUser.dataValues.id, loggedUser.dataValues.role, 10*60*60, JWT_REFRESH_TOKEN_SECRET_KEY);

        //save refresh token in the database and set cookie
        await User.updateRefreshToken(loggedUser.dataValues.id, refreshToken);
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV !== "dev", maxAge: 10*60*60*1000 })

        //send userID, userRole and accessToken
        res.status(200).json({status: 'success', data: {userID: loggedUser.dataValues.id, userRole: loggedUser.dataValues.role, accessToken}});
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