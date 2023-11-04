
import { NextFunction, Request, Response, response } from 'express'

import User from '../models/User';




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
    if (!isNaN(Number(req.params.userid))) {
        try {
            const data = await User.fetchOne(Number(req.params.carid));
            res.status(200).json({status: 'success', data: data})
        }
        catch(err) {
            res.status(500).json({status: 'error', message: err})
        }
    }
    else {
        res.status(400).json({status: 'fail', data: ['You have passed a wrong user ID.']})
    }   

}
