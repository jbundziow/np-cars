
import { NextFunction, Request, Response } from 'express'

import User from '../models/User';
import identifyUserId from '../utilities/functions/JWT/identifyUserId';
import { editOneUserByNormalUserSchema } from '../models/validation/UserSchemas';



export const fetchAllUsers_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    let alsoBanned = false;
    if(req.query.showbanned && req.query.showbanned === 'true') {
        alsoBanned = true;
    }

    try {
        const data = await User.fetchAll(alsoBanned);
        res.json({status: 'success', data: data});
    }
    catch(e) {
        res.status(500).json({status: 'error', message: e})
    }
}

export const fetchOneUser_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    let alsoBanned = false;
    if(req.query.showbanned && req.query.showbanned === 'true') {
        alsoBanned = true;
    }

    if (!isNaN(Number(req.params.userid))) {
        try {
            const data = await User.fetchOne(Number(req.params.userid), alsoBanned);
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






export const editOneUser_PUT_user = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    if (!req.params.userid || isNaN(Number(req.params.userid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }

    try {
        const isUserExist = await User.fetchOne(Number(req.params.userid), true)
        if(!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${Number(req.params.userid)} does not exist in the database.`, pl: `Użytkownik o ID: ${Number(req.params.userid)} nie istnieje w bazie danych.`}]})
            return;
        }

        const {id: userID} = await identifyUserId(req.cookies.jwt);
        if(userID !== Number(req.params.userid)) {
            res.status(400).json({status: 'fail', data: [{en: `You cannot edit other user's data when you are not administrator.`, pl: `Nie możesz edytować danych innego użytkownika nie będąc administratorem.`}]})
            return;
        }


        const editedUser = new User(userID, null, null, data.gender, data.name, data.surname, data.employedAs, null, null);

        await editOneUserByNormalUserSchema.validateAsync(editedUser);
        const result = await editedUser.editOneUserAsUser();

        res.status(200).json({status: 'success', data: result});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }
}