
const bcrypt = require('bcrypt');
const crypto = require('crypto');

import { NextFunction, Request, Response, response } from 'express'
import { signUpUserSchema } from '../models/validation/UserSchemas';
import createToken from '../utilities/functions/JWT/createToken'
import User, { UserModel } from '../models/User';
import AuthServices, { AuthServicesModel } from '../models/AuthServices';

//email API
import sgMail from '@sendgrid/mail';
import emailHTML from '../utilities/emailTemplates/emailHTML';
import Joi from 'joi';
import identifyUserId from '../utilities/functions/JWT/identifyUserId';











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
                res.status(400).json({status: 'fail', data: [{en: `An password change request has already been sent to: ${data.email}. Check also the SPAM tab. If the e-mail does not arrive, another attempt at sending it will be possible in ${Math.ceil((new Date(isLastTokenStillActive.dataValues.resendAvailableAt).getTime() - new Date().getTime())/60000)} minutes.`, pl: `Prośba o zmianę hasła do konta została już wysłana na adres: ${data.email}. Sprawdź również kartę SPAM. Jeśli mail nie dociera, to następna próba wysłania linku będzie możliwa za ${Math.ceil((new Date(isLastTokenStillActive.dataValues.resendAvailableAt).getTime() - new Date().getTime())/60000)} minut.`}]})
                return;
            }
        }


            //create and send new token
            const token = crypto.randomBytes(64).toString("hex");
            const salt = await bcrypt.genSalt();
            const hashedToken = await bcrypt.hash(token, salt);
            
            

            const newRequest = new AuthServices(null, Number(isUserExist.dataValues.id), 'password_change', data.email, date3MinutesLater, hashedToken, date24HoursLater);
            const db_Result = await newRequest.addOneRequest();


            sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
            const msg = {
                to: data.email,
                from: `${process.env.EMAIL_FROM}`,
                subject: 'Zmiana hasła | NP-CARS',
                text: ' | NP-CARS | ',
                html: emailHTML('Prośba o zmianę hasła', `Otrzymaliśmy prośbę o zmianę hasła do Twojego konta ${isUserExist.dataValues.name} ${isUserExist.dataValues.surname} w serwisie NP-CARS.`, 'Zresetuj hasło', `${process.env.FRONTEND_URL}/auth/reset_password?token=${token}&userid=${isUserExist.dataValues.id}&email=${data.email}`)
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
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }

}




















export const changePassword_PUT_public = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    if(!data.token) {
        res.status(400).json({status: 'fail', data: [{en: `Wrong 'token' passed.`, pl: `Podano nieprawidłowy token.`}]});
        return;
    }
    if(!data.password) {
        res.status(400).json({status: 'fail', data: [{en: `No new 'password' passed.`, pl: `Nie podano nowego hasła.`}]});
        return;
    }
    
    if(!data.email) {
        res.status(400).json({status: 'fail', data: [{en: `No 'email' passed.`, pl: `Nie podano adresu email.`}]});
        return;
    }
    if(!data.userid || isNaN(data.userid)) {
        res.status(400).json({status: 'fail', data: [{en: `Wrong 'userid' passed.`, pl: `Podano nieprawidłowe id użytkownika.`}]});
        return;
    }


    try {
        const passwordSchema = Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .min(8)
        .required();

        const { error } = passwordSchema.validate(data.password);
        if (error) {
            res.status(400).json({ status: 'fail', data: [{ en: `The password you entered does not meet the requirements. It has not passed validation.`, pl: 'Podane hasło nie spełnia wymagań. Nie przeszło walidacji.' }] });
            return;
        }


        const isUserExist = await UserModel.findOne({where: {id: data.userid, email: data.email}});
        if(!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `User with email: ${data.email} does not exist in the database.`, pl: `Użytkownik o adresie email: ${data.email} nie istnieje w bazie danych.`}]})
            return;
        }

        const dbResullt = await AuthServices.findLastActiveTokenOfUser(data.userid, data.email, 'password_change');
        if(!dbResullt) {
            res.status(400).json({status: 'fail', data: [{en: `Password change request for that user is not found in the database or the token has expired after 24 hours. You need to send 'change password' link again to your email address.`, pl: `Prośba o zmianę hasła dla tego użytkownika nie została znaleziona w bazie danych lub token wygasł po 24 godzinach. Musisz ponownie wysłać link do zmiany hasła na swój adres email.`}]});
            return;
        }


        const tokenAuthenticated = await bcrypt.compare(data.token, dbResullt.dataValues.token);
        if(!tokenAuthenticated) {
            res.status(400).json({status: 'fail', data: [{en: `The token is invalid. You cannot change password.`, pl: `Token jest nieprawidłowy. Nie możesz zmienić hasła.`}]});
            return;
        }


        //hash and then change password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.password, salt);
        const isPasswordChanged = await UserModel.update({password: hashedPassword}, {where: {id: isUserExist.dataValues.id}});

        if(Array.isArray(isPasswordChanged) && !isPasswordChanged[0]) {
            res.status(400).json({status: 'fail', data: [{en: `An error occured while changing the password. Try again later.`, pl: `Wystąpił błąd podczas zmiany hasła. Spróbuj ponownie później.`}]});
            return;
        }

        await AuthServicesModel.update({tokenExpiresAt: new Date()}, {where: {id: dbResullt.dataValues.id}});

        res.status(200).json({status: 'success', data: 'Password successfully changed.'});


    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }
}










































export const changeEmailRequest_POST_public = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    const currentDate = new Date();
    const date3MinutesLater = new Date(currentDate.getTime() + 3*60000);
    const date24HoursLater = new Date(currentDate.getTime() + 24*60*60000);

    if(!data.old_email) {
        res.status(400).json({status: 'fail', data: [{en: `'old_email' not passed.`, pl: `Nie podano 'old_email'.`}]})
        return;
    }

    if(!data.new_email) {
        res.status(400).json({status: 'fail', data: [{en: `'new_email' not passed.`, pl: `Nie podano 'new_email'.`}]})
        return;
    }

    try {
        const isUserExist = await UserModel.findOne({where: {email: data.old_email}});
        if(!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `User with email: ${data.old_email} does not exist in the database.`, pl: `Użytkownik o adresie email: ${data.old_email} nie istnieje w bazie danych.`}]})
            return;
        }

        const {id: userID, role: userRole} = await identifyUserId(req.cookies.jwt);
        if(userID !== isUserExist.dataValues.id && userRole !== 'admin') {
            res.status(400).json({status: 'fail', data: [{en: `You are not authorized to change the email of another user.`, pl: `Nie masz uprawnień do zmiany adresu email innego użytkownika.`}]}); 
            return;
        }

        const isNewEmailExist = await UserModel.findOne({where: {email: data.new_email}});
        if(isNewEmailExist) {
            res.status(400).json({status: 'fail', data: [{en: `User with new email: ${data.new_email} already exist in the database.`, pl: `Użytkownik o nowym adresie email: ${data.new_email} już istnieje w bazie danych.`}]})
            return;
        }



        const isLastTokenStillActive = await AuthServices.findLastActiveTokenOfUser(Number(isUserExist.dataValues.id), data.new_email, 'email_change');
        if(isLastTokenStillActive) {
            if(new Date(isLastTokenStillActive.dataValues.resendAvailableAt) > new Date()) {
                res.status(400).json({status: 'fail', data: [{en: `An email change request has already been sent to: ${data.new_email}. Check also the SPAM tab. If the e-mail does not arrive, another attempt at sending it will be possible in ${Math.ceil((new Date(isLastTokenStillActive.dataValues.resendAvailableAt).getTime() - new Date().getTime())/60000)} minutes.`, pl: `Prośba o zmianę adresu email została już wysłana na adres: ${data.new_email}. Sprawdź również kartę SPAM. Jeśli mail nie dociera, to następna próba wysłania linku będzie możliwa za ${Math.ceil((new Date(isLastTokenStillActive.dataValues.resendAvailableAt).getTime() - new Date().getTime())/60000)} minut.`}]})
                return;
            }
        }
            
            //create and send new token
            const token = crypto.randomBytes(64).toString("hex");
            const salt = await bcrypt.genSalt();
            const hashedToken = await bcrypt.hash(token, salt);
            
            

            const newRequest = new AuthServices(null, Number(isUserExist.dataValues.id), 'email_change', data.new_email, date3MinutesLater, hashedToken, date24HoursLater);
            const db_Result = await newRequest.addOneRequest();


            sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
            const msg = {
                to: data.new_email,
                from: `${process.env.EMAIL_FROM}`,
                subject: 'Zmiana adresu email | NP-CARS',
                text: ' | NP-CARS | ',
                html: emailHTML('Prośba o zmianę adresu email', `Otrzymaliśmy prośbę o zmianę adresu email przypisanego do Twojego konta ${isUserExist.dataValues.name} ${isUserExist.dataValues.surname} w naszym serwisie NP-CARS na nowy adres: ${data.new_email} .`, 'Potwierdź zmianę', `${process.env.FRONTEND_URL}/auth/change_email?token=${token}&userid=${isUserExist.dataValues.id}&userfullname=${isUserExist.dataValues.name}%20${isUserExist.dataValues.surname}&old_email=${data.old_email}&new_email=${data.new_email}`)
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
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }

}





























export const changeEmail_PUT_public = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    if(!data.token) {
        res.status(400).json({status: 'fail', data: [{en: `Wrong 'token' passed.`, pl: `Podano nieprawidłowy token.`}]});
        return;
    }

    if(!data.userid || isNaN(data.userid)) {
        res.status(400).json({status: 'fail', data: [{en: `Wrong 'userid' passed.`, pl: `Podano nieprawidłowe id użytkownika.`}]});
        return;
    }

    if(!data.new_email) {
        res.status(400).json({status: 'fail', data: [{en: `Wrong 'new_email' passed.`, pl: `Podano nieprawidłowe 'new_email'.`}]});
        return;
    }


    try {


        const isUserExist = await UserModel.findOne({where: {id: data.userid}});
        if(!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `User of ID: ${data.userid} does not exist in the database.`, pl: `Użytkownik o ID: ${data.userid} nie istnieje w bazie danych.`}]})
            return;
        }

        const dbResult = await AuthServices.findLastActiveTokenOfUser(data.userid, data.new_email, 'email_change');
        if(!dbResult) {
            res.status(400).json({status: 'fail', data: [{en: `Email change request for that user is not found in the database or the token has expired after 24 hours. You need to send 'change email' link again to your new email address.`, pl: `Prośba o zmianę adresu email dla tego użytkownika nie została znaleziona w bazie danych lub token wygasł po 24 godzinach. Musisz ponownie wysłać link do zmiany adresu email na swój nowy adres email.`}]});
            return;
        }


        const tokenAuthenticated = await bcrypt.compare(data.token, dbResult.dataValues.token);
        if(!tokenAuthenticated) {
            res.status(400).json({status: 'fail', data: [{en: `The token is invalid. You cannot change email.`, pl: `Token jest nieprawidłowy. Nie możesz zmienić adresu email.`}]});
            return;
        }



        const isEmailChanged = await UserModel.update({email: dbResult.dataValues.sendTo}, {where: {id: dbResult.dataValues.userID}});

        if(Array.isArray(isEmailChanged) && !isEmailChanged[0]) {
            res.status(400).json({status: 'fail', data: [{en: `An error occured while changing the email address. Try again later.`, pl: `Wystąpił błąd podczas zmiany adresu email. Spróbuj ponownie później.`}]});
            return;
        }

        await AuthServicesModel.update({tokenExpiresAt: new Date()}, {where: {id: dbResult.dataValues.id}});

        res.status(200).json({status: 'success', data: 'Email successfully changed.'});


    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }
}