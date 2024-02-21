
import { NextFunction, Request, Response } from 'express'

import User from '../models/User';



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
