
import { NextFunction, Request, Response, response } from 'express'

import Fault from '../models/Fault'
import Car from '../models/Car'




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

export const fetchOneFault = async (req: Request, res: Response, next: NextFunction) => {
    if (!isNaN(Number(req.params.faultid))) {
        try {
            const faultData = await Fault.fetchOne(Number(req.params.faultid));

            if(faultData) {
                const carID = faultData.dataValues.carID;
                const carData = await Car.fetchOneBasicData(carID);
                if(carData) {
                    res.json({status: 'success', data: {carData, faultData}})
                }
                else {
                    res.json({status: 'fail', data: [`Cannot get car data of this fault. Trying to fetch car of ID: ${carID}.`]})
                }
            }
            else {
                res.json({status: 'fail', data: [`Fault of ID: ${req.params.faultid} does not exist.`]})
            }
        }
        catch(e) {
            res.json({status: 'error', message: e})
        }
    }
    else {
        res.json({status: 'fail', data: ['You have passed a wrong fault ID.']})
    }
}

export const fetchAllFaultsOfACar = async (req: Request, res: Response, next: NextFunction) => {
    if (!isNaN(Number(req.params.carid))) {
        try {
            const carData = await Car.fetchOneBasicData(Number(req.params.carid))

            if(carData !== null) {
                let pending, accepted, finished, cancelled;
                if(req.query.basicdata && req.query.basicdata === 'true') {
                    pending = await Fault.fetchAllByCarIdAndStatusBasic(Number(req.params.carid), 'pending');
                    accepted = await Fault.fetchAllByCarIdAndStatusBasic(Number(req.params.carid), 'accepted');
                    finished = await Fault.fetchAllByCarIdAndStatusBasic(Number(req.params.carid), 'finished');
                    cancelled = await Fault.fetchAllByCarIdAndStatusBasic(Number(req.params.carid), 'cancelled');
                }
                else {
                    pending = await Fault.fetchAllByCarIdAndStatus(Number(req.params.carid), 'pending');
                    accepted = await Fault.fetchAllByCarIdAndStatus(Number(req.params.carid), 'accepted');
                    finished = await Fault.fetchAllByCarIdAndStatus(Number(req.params.carid), 'finished');
                    cancelled = await Fault.fetchAllByCarIdAndStatus(Number(req.params.carid), 'cancelled');
                }
                res.json({status: 'success', data: {carData, pending, accepted, finished, cancelled}})
            }
            else {
                res.json({status: 'fail', data: [`Car of ID: ${req.params.carid} does not exist.`]})
            }
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
            let pending:number[] = [];
            let accepted:number[] = [];
            let finished:number[] = [];
            let cancelled:number[] = [];

            carsData.forEach(item => carsIDs.push(item.dataValues.id))

            for await (const id of carsIDs) {
            pending.push(await Fault.fetchNumberOfRecordsOfCarThatHaveStatus('pending', id));
            accepted.push(await Fault.fetchNumberOfRecordsOfCarThatHaveStatus('accepted', id));
            finished.push(await Fault.fetchNumberOfRecordsOfCarThatHaveStatus('finished', id));
            cancelled.push(await Fault.fetchNumberOfRecordsOfCarThatHaveStatus('cancelled', id));
            }

            carsData.map((carData, index) => {
                carData.dataValues.pending = pending[index];
                carData.dataValues.accepted = accepted[index];
                carData.dataValues.finished = finished[index];
                carData.dataValues.cancelled = cancelled[index];
            })
            res.json({status: 'success', data: carsData})
        }
        catch(e) {
            res.json({status: 'error', message: e})
        }
}



//TODO: update fault by admin
//TODO: edit/delete my own fault
//TODO: get faults of user
//TODO: get one specific fault


