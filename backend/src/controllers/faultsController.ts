
import { NextFunction, Request, Response, response } from 'express'

import Fault from '../models/Fault'



export const fetchAllFaults = async (req: Request, res: Response, next: NextFunction) => {
res.json('ok')
}

export const addOneFault = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: VALIDATE DATA BEFORE ADDING RECORD TO DB
    //TODO: PASS CORRECT USER ID
    const data = req.body;
    try {
    const newFault = new Fault(null, Number(req.params.id), 1, null, null, data.title, data.description, 'pending', null, null);
    await newFault.addOneFault();
    res.json({status: 'success', data: req.body});
    }
    catch (err) {
        res.json({status: 'error', message: err})
    }
}


//TODO: update fault by admin
//TODO: edit/delete my own fault
//TODO: get faults of car + carIMG etc.
//TODO: get amount of pending/accepted/solved/cancelled faults of car + carIMG etc.
//TODO: get faults of user


