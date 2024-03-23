
const bcrypt = require('bcrypt');
const crypto = require('crypto');

import { NextFunction, Request, Response, response } from 'express'
import { signUpUserSchema } from '../models/validation/UserSchemas';
import createToken from '../utilities/functions/JWT/createToken'
import User, { UserModel } from '../models/User';
import AuthServices from '../models/AuthServices';

//email API
import sgMail from '@sendgrid/mail';
import emailHTML from '../utilities/emailTemplates/emailHTML';











export const signup_POST_public = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    try {
    const newUser = new User(null, data.email.toLowerCase(), data.password, data.gender, data.name, data.surname, data.employedAs, null, 'unconfirmed');
    await signUpUserSchema.validateAsync(newUser);

    //hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    newUser.changePassword(hashedPassword);

    const result = await newUser.addOneUser();
    if(result) {
        res.status(200).json({status: 'success', data: 'User successfully registered.'});
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

















export const login_POST_public = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    try {

    if(req.cookies.jwt) { //logout if user is already logged in
        res.cookie('jwt', '', { maxAge: 1 });
        res.cookie('userID', '', { maxAge: 1 });
        res.cookie('userRole', '', { maxAge: 1 });
    }

    
        const loggedUser = await User.login(email, password);
        const token = createToken(loggedUser.dataValues.id, loggedUser.dataValues.role, Number(process.env.JWT_MAXAGE));
        //TODO: MAKE SURE THAT IN PRODUCTION SECURE IS ENABLED
        res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV !== "dev", maxAge: Number(process.env.JWT_MAXAGE)*1000 })

        //available for frontend to read, the same maxAge as httpOnly JWT token
        res.cookie('userID', loggedUser.dataValues.id, { httpOnly: false, secure: process.env.NODE_ENV !== "dev", maxAge: Number(process.env.JWT_MAXAGE)*1000 })
        res.cookie('userRole', loggedUser.dataValues.role, { httpOnly: false, secure: process.env.NODE_ENV !== "dev", maxAge: Number(process.env.JWT_MAXAGE)*1000 })

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
















export const logout_GET_public = async (req: Request, res: Response, next: NextFunction) => {
    try {
    res.cookie('jwt', '', { maxAge: 1 });
    res.cookie('userID', '', { maxAge: 1 });
    res.cookie('userRole', '', { maxAge: 1 });
    res.status(200).json({status: 'success', data: {}});
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}


















export const changePasswordRequest_POST_public = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    const currentDate = new Date();
    const date3MinutesLater = new Date(currentDate.getTime() + 3*60000);
    const date24HoursLater = new Date(currentDate.getTime() + 24*60*60000);

    if(!data.email) {
        res.status(400).json({status: 'fail', data: [{en: `'email' not passed.`, pl: `Nie podano 'email'.`}]})
        return;
    }

    try {
        const isUserExist = await UserModel.findOne({where: {email: data.email}});
        if(!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `User with email: ${data.email} does not exist in the database.`, pl: `Użytkownik o adresie email: ${data.email} nie istnieje w bazie danych.`}]})
            return;
        }

        const isLastTokenStillActive = await AuthServices.findLastActiveTokenOfUser(Number(isUserExist.dataValues.id), data.email, 'password_change');
        if(isLastTokenStillActive) {
            if(new Date(isLastTokenStillActive.dataValues.resendAvailableAt) > new Date()) {
                res.status(400).json({status: 'fail', data: [{en: `A password change request has already been sent to: ${data.email}. Check also the SPAM tab. If the e-mail does not arrive, another attempt at sending it will be possible in ${Math.ceil((new Date(isLastTokenStillActive.dataValues.resendAvailableAt).getTime() - new Date().getTime())/60000)} minutes.`, pl: `Prośba o zmianę hasła została już wysłana na adres: ${data.email}. Sprawdź również kartę SPAM. Jeśli mail nie dociera, to następna próba wysłania linku będzie możliwa za ${Math.ceil((new Date(isLastTokenStillActive.dataValues.resendAvailableAt).getTime() - new Date().getTime())/60000)} minut.`}]})
                return;
            }
            
            sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
            const msg = {
                to: data.email,
                from: 'kuba.novaprocess@gmail.com',
                subject: 'Zmiana hasła | NP-CARS',
                text: ' | NP-CARS | ',
                html: emailHTML('Prośba o zmianę hasła', 'Otrzymaliśmy prośbę o zmianę hasła do Twojego konta.', 'Zresetuj hasło', `${process.env.FRONTEND_URL}/auth/reset_password?token=${isLastTokenStillActive.dataValues.token}`)
            }
            const emailResult = await sgMail.send(msg);
            let emailSent = false;
            if(emailResult && Array.isArray(emailResult) && emailResult[0]?.statusCode === 202) {emailSent = true};

            if(!emailSent) {
                res.status(400).json({status: 'fail', data: [{en: `An error occured while sending an email. Try again later.`, pl: `Wystąpił problem z wysyłaniem maila. Spróbuj ponownie później.`}]})
                return;
            }


            const isResendAgainDateUpdated = await AuthServices.changeResendAvailableAt(Number(isLastTokenStillActive.dataValues.id), date3MinutesLater);

            res.status(200).json({status: 'success', data: {emailSent, isResendAgainDateUpdated}});

        }
        else {
            //create and send new token
            const token = crypto.randomBytes(64).toString("hex");
            const salt = await bcrypt.genSalt();
            const hashedToken = await bcrypt.hash(token, salt);
            

            const newRequest = new AuthServices(null, Number(isUserExist.dataValues.id), 'password_change', data.email, date3MinutesLater, hashedToken, date24HoursLater);
            const db_Result = await newRequest.addOneRequest();


            sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
            const msg = {
                to: data.email,
                from: 'kuba.novaprocess@gmail.com',
                subject: 'Zmiana hasła | NP-CARS',
                text: ' | NP-CARS | ',
                html: emailHTML('Prośba o zmianę hasła', 'Otrzymaliśmy prośbę o zmianę hasła do Twojego konta.', 'Zresetuj hasło', `${process.env.FRONTEND_URL}/auth/reset_password?token=${hashedToken}`)
            }
            const emailResult = await sgMail.send(msg);
            let emailSent = false;
            if(emailResult && Array.isArray(emailResult) && emailResult[0]?.statusCode === 202) {emailSent = true};

            if(!emailSent) {
                res.status(400).json({status: 'fail', data: [{en: `An error occured while sending an email. Try again later.`, pl: `Wystąpił problem z wysyłaniem maila. Spróbuj ponownie później.`}]})
                return;
            }

            res.status(200).json({status: 'success', data: emailSent});

        }

    

    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }

}