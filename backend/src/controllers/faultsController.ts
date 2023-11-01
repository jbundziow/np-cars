
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


export const fetchAllFaultsOfACar = async (req: Request, res: Response, next: NextFunction) => {
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

export const fetchAllCarsWithNumberOfFaults = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const carsData = await Car.fetchAllBasicData();
            let carsIDs:number[] = []
            carsData.forEach(item => carsIDs.push(item.dataValues.id))

            let pending: any = [];
            let accepted:any = [];
            let finished:any = [];
            let cancelled:any = [];
            carsIDs.forEach(async (id) => {
                
                pending.push(await Fault.fetchNumberOfRecordsOfCarThatHaveStatus('pending', id));
                accepted.push(await Fault.fetchNumberOfRecordsOfCarThatHaveStatus('accepted', id));
                finished.push(await Fault.fetchNumberOfRecordsOfCarThatHaveStatus('finished', id));
                cancelled.push(await Fault.fetchNumberOfRecordsOfCarThatHaveStatus('cancelled', id));
            })
            setTimeout(()=> {res.json({status: 'success', data: {carsData, pending, accepted, finished, cancelled}})}, 3000)
            
        }
        catch(e) {
            res.json({status: 'error', message: e})
        }
        // try {
        //     const carsData = await Car.fetchAllBasicData();
        //     //get in array only ids of car
        //     const carsIDs = [1,2,3,4];
        //     let pending:number[] = [];
        //     let accepted = [];
        //     let finished = [];
        //     let cancelled = [];
        //     carsIDs.forEach(id => {
        //         pending.push = await Fault.fetchNumberOfRecordsOfCarThatHaveStatus('pending', id);
        //         accepted.push = await Fault.fetchNumberOfRecordsOfCarThatHaveStatus('accepted', id);
        //         finished.push = await Fault.fetchNumberOfRecordsOfCarThatHaveStatus('finished', id);
        //         cancelled.push = await Fault.fetchNumberOfRecordsOfCarThatHaveStatus('cancelled', id);
        //     })
        //     res.json({status: 'success', data: {carIDs, pending, accepted, finished}})
        // }
        // catch(e) {
        //     res.json({status: 'error', message: e})
        // }
//    res.end('ok')
}


export const test = async (req: Request, res: Response, next: NextFunction) => {
    const xx = await Fault.fetchNumberOfRecordsOfCarThatHaveStatus('pending', 1);
    res.json(xx)
}
//TODO: update fault by admin
//TODO: edit/delete my own fault
//TODO: get faults of car + carIMG etc.
//TODO: get amount of pending/accepted/solved/cancelled faults of car + carIMG etc.
//TODO: get faults of user


