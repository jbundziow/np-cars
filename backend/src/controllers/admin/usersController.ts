
import { NextFunction, Request, Response, response } from 'express'

import User from '../../models/User';
import { addOneUserSchema } from '../../models/validation/UserSchemas';





export const addOneUser = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: VALIDATE DATA BEFORE ADDING RECORD TO DB
    //TODO: ONLY ADMIN CAN ADD USER!!!
    const data = req.body;
    try {
    const newUser = new User(null, data.gender, data.name, data.surname, data.employedAs, data.avatarPath, data.role);
    await addOneUserSchema.validateAsync(newUser);
    await newUser.addOneUser();
    res.status(200).json({status: 'success', data: req.body});
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}