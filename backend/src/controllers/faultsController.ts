
import { NextFunction, Request, Response, response } from 'express'

import Fault from '../models/Fault'
import Car from '../models/Car'



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


export const getAllFaultsOfACar = async (req: Request, res: Response, next: NextFunction) => {
    if (!isNaN(Number(req.params.carid))) {
        try {
            const carData = await Car.fetchOneBasicData(Number(req.params.carid))
            const pending = await Fault.fetchAllByCarIdAndStatus(Number(req.params.carid), 'pending');
            const accepted = await Fault.fetchAllByCarIdAndStatus(Number(req.params.carid), 'accepted');
            const finished = await Fault.fetchAllByCarIdAndStatus(Number(req.params.carid), 'finished');
            const cancelled = await Fault.fetchAllByCarIdAndStatus(Number(req.params.carid), 'cancelled');
            res.json({status: 'success', data: {carData, pending, accepted, finished, cancelled}})
        }
        catch(e) {
            res.json({status: 'error', message: e})
        }
    }
    else {
        res.json({status: 'fail', data: ['You have passed a wrong car ID.']})
    }
}

//TODO: update fault by admin
//TODO: edit/delete my own fault
//TODO: get faults of car + carIMG etc.
//TODO: get amount of pending/accepted/solved/cancelled faults of car + carIMG etc.
//TODO: get faults of user


