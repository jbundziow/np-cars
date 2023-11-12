
import { NextFunction, Request, Response, response } from 'express'

import Fault from '../models/Fault'
import Car from '../models/Car'




export const addOneFault = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: VALIDATE DATA BEFORE ADDING RECORD TO DB
    //TODO: PASS CORRECT USER ID

    const data = req.body;
    if (!isNaN(Number(req.params.carid))) {
        try {
        const isCarExist = await Car.fetchOne(Number(req.params.carid))
        if(isCarExist) {
        const newFault = new Fault(null, Number(req.params.carid), 1, null, null, data.title, data.description, 'pending', null, null);
        await newFault.addOneFault();
        res.status(200).json({status: 'success', data: data});
        }
        else {
            res.status(400).json({status: 'fail', data: {en: `The car of id: ${req.params.carid} does not exist in the database.`, pl: `Samochód o ID: ${req.params.carid} nie istnieje w bazie danych.`}})
        }
        }
        catch (err) {
            res.status(500).json({status: 'error', message: err})
        }
    }
    else {
        res.status(400).json({status: 'fail', data: {en: 'You have passed a wrong car ID.', pl: 'Podano zły ID samochodu.'}});
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
                    res.status(200).json({status: 'success', data: {carData, faultData}})
                }
                else {
                    res.status(400).json({status: 'fail', data: [`Cannot get car data of this fault. Trying to fetch car of ID: ${carID}.`]})
                }
            }
            else {
                res.status(400).json({status: 'fail', data: {en: `Fault of ID: ${req.params.faultid} does not exist.`, pl: `Usterka o ID: ${req.params.faultid} nie istnieje.`}})
            }
        }
        catch(e) {
            res.status(500).json({status: 'error', message: e})
        }
    }
    else {
        res.status(400).json({status: 'fail', data: {en: 'You have passed a wrong fault ID.', pl: 'Podano zły ID usterki.'}});
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
                res.status(200).json({status: 'success', data: {carData, pending, accepted, finished, cancelled}})
            }
            else {
                res.status(400).json({status: 'fail', data: {en: `Car of ID: ${req.params.carid} does not exist.`, pl: `Samochód o ID: ${req.params.caird} nie istnieje.`}})
            }
        }
        catch(e) {
            res.status(500).json({status: 'error', message: e})
        }
    }
    else {
        res.status(400).json({status: 'fail', data: {en: 'You have passed a wrong car ID.', pl: 'Podano zły ID samochodu.'}});
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
            res.status(200).json({status: 'success', data: carsData})
        }
        catch(e) {
            res.status(500).json({status: 'error', message: e})
        }
}


export const fetchAllFaultsOfUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!isNaN(Number(req.params.userid))) {
        try {
            let faultsOfUser;
            if(req.query.basicdata && req.query.basicdata === 'true') {
                faultsOfUser = await Fault.fetchAllOfUserBasic(Number(req.params.userid));
            }
            else {
                faultsOfUser = await Fault.fetchAllOfUser(Number(req.params.userid));
            }
            
            res.status(200).json({status: 'success', data: faultsOfUser})
        }
        catch(e) {
            res.status(500).json({status: 'error', message: e})
        }
    }
    else {
        res.status(400).json({status: 'fail', data: {en: 'You have passed a wrong user ID.', pl: 'Podano zły ID użytkownika.'}});
    }   
}


//TODO: update fault by admin
//TODO: edit/delete my own fault


