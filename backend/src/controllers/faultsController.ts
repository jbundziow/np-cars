
import { NextFunction, Request, Response, response } from 'express'

import Fault from '../models/Fault'
import Car from '../models/Car'
import User from '../models/User';
import { addOneFaultByUserSchema } from '../models/validation/FaultsSchemas';
import identifyUserId from '../utilities/functions/JWT/identifyUserId';














export const addOneFault_POST_user = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (!isNaN(Number(req.params.carid))) {
        try {
        const isCarExist = await Car.fetchOne(Number(req.params.carid), false)
        const {id: userID} = await identifyUserId(req.cookies.jwt);
        const isUserExist = await User.fetchOne(userID, false);
        if(isCarExist && isUserExist) {
        const newFault = new Fault(null, Number(req.params.carid), userID, null, null, data.title, data.description, 'pending', null, null);
        await addOneFaultByUserSchema.validateAsync(newFault);
        const duplicate = await Fault.fetchDuplicate(Number(req.params.carid), data.title, data.description);
        if(duplicate) {
            res.status(400).json({status: 'fail', data: [{en: `This fault is already exist for that car`, pl: `Taka usterka już istnieje dla tego samochodu`}]})
            return;
        }
        await newFault.addOneFault();
        res.status(200).json({status: 'success', data: data});
        }
        else {
            if(!isCarExist) {
                res.status(400).json({status: 'fail', data: [{en: `The car of id: ${Number(req.params.carid)} does not exist in the database.`, pl: `Samochód o ID: ${Number(req.params.carid)} nie istnieje w bazie danych.`}]})
                return;
            }
            else if (!isUserExist) {
                res.status(400).json({status: 'fail', data: [{en: `The user of id: ${userID} does not exist in the database.`, pl: `Użytkownik o ID: ${userID} nie istnieje w bazie danych.`}]})
                return;
            }
        }
        }
        catch (err) {
            res.status(500).json({status: 'error', message: err})
        }
    }
    else {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano zły ID samochodu.'}]});
    }
}

























export const fetchOneFault_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    if (!isNaN(Number(req.params.faultid))) {
        try {
            const faultData = await Fault.fetchOne(Number(req.params.faultid));

            if(faultData) {
                const carID = faultData.dataValues.carID;
                const carData = await Car.fetchOneBasicData(carID, true);
                if(carData) {
                    res.status(200).json({status: 'success', data: {carData, faultData}})
                }
                else {
                    res.status(400).json({status: 'fail', data: [{en: `Cannot get car data of this fault.`, pl: `Nie można pobrać danych dotyczących samochodu powiązanego z tą usterką.`}]})
                }
            }
            else {
                res.status(400).json({status: 'fail', data: [{en: `Fault of ID: ${req.params.faultid} does not exist.`, pl: `Usterka o ID: ${req.params.faultid} nie istnieje.`}]})
            }
        }
        catch(e) {
            res.status(500).json({status: 'error', message: e})
        }
    }
    else {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong fault ID.', pl: 'Podano złe ID usterki.'}]});
    }
}
























export const fetchAllFaultsOfACar_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    if (!isNaN(Number(req.params.carid))) {
        try {
            const carData = await Car.fetchOneBasicData(Number(req.params.carid), true)

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
                res.status(400).json({status: 'fail', data: [{en: `Car of ID: ${req.params.carid} does not exist w bazie danych.`, pl: `Samochód o ID: ${req.params.carid} nie istnieje w bazie danych.`}]})
            }
        }
        catch(e) {
            res.status(500).json({status: 'error', message: e})
        }
    }
    else {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano zły ID samochodu.'}]});
    }
}






















export const fetchAllCarsWithNumberOfFaults_GET_user = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const carsData = await Car.fetchAllBasicData(true);
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






















export const fetchAllFaultsOfUser_GET_user = async (req: Request, res: Response, next: NextFunction) => {

    if(!req.query.pagenumber || isNaN(Number(req.query.pagenumber))) {
        res.status(400).json({status: 'fail', data: [{en: `No query param 'pagenumber' passed or it is not a number.`, pl: `Nie przekazano 'pagenumber' w parametrach zapytania lub nie jest to cyfra.`}]})
        return;
    }
    if(!req.query.pagesize || isNaN(Number(req.query.pagesize))) {
        res.status(400).json({status: 'fail', data: [{en: `No query param 'pagesize' passed or it is not a number.`, pl: `Nie przekazano 'pagesize' w parametrach zapytania lub nie jest to cyfra.`}]})
        return;
    }

    let sortFromOldest = false;
    if(req.query.sortfromoldest && req.query.sortfromoldest === 'true') {sortFromOldest = true}
    

    if (!isNaN(Number(req.params.userid))) {
        try {
            const pageNumber = Number(req.query.pagenumber);
            const pageSize = Number(req.query.pagesize);

            if(req.query.basicdata && req.query.basicdata === 'true') {
                const faultsOfUser = await Fault.fetchAllOfUserBasic(Number(req.params.userid));
                res.status(200).json({status: 'success', data: faultsOfUser})
            }
            else {
                const response = await Fault.fetchAllOfUser(Number(req.params.userid), pageSize, pageNumber, sortFromOldest);
                res.status(200).json({status: 'success', data: response.records, pagination: response.pagination})
            }
            
            
        }
        catch(e) {
            console.log(e);
            res.status(500).json({status: 'error', message: e})
        }
    }
    else {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]});
    }   
}



















export const deleteOneFault_DELETE_user = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.params.faultid || isNaN(Number(req.params.faultid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong fault ID.', pl: 'Podano złe ID usterki.'}]})
        return;
    }


    try {
        const isFaultExist = await Fault.fetchOne(Number(req.params.faultid));
        const {id: userID} = await identifyUserId(req.cookies.jwt);
        const isUserExist = await User.fetchOne(userID, false)

        if(!isFaultExist) {
            res.status(400).json({status: 'fail', data: [{en: `The fault of id: ${Number(req.params.faultid)} does not exist in the database.`, pl: `Usterka o ID: ${Number(req.params.faultid)} nie istnieje w bazie danych.`}]})
            return;
        }
        if(!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${userID} does not exist in the database.`, pl: `Użytkownik o ID: ${userID} nie istnieje w bazie danych.`}]})
            return;
        }

        if(isFaultExist.dataValues.userID !== userID) {
            res.status(400).json({status: 'fail', data: [{en: `You cannot delete a fault that does not belong to you`, pl: `Nie możesz usunąć usterki, która nie należy do Ciebie.`}]})
            return; 
        }

        const dateToday = new Date()
        const oneDayAgo = new Date(dateToday.getTime() - 24 * 60 * 60 * 1000); // subtract 1 day from today's date
        if (isFaultExist.dataValues.createdAt < oneDayAgo) {
            res.status(400).json({status: 'fail', data: [{en: `You cannot delete faults older than 1 day. Only administrator has permissions to do it.`, pl: `Nie możesz usuwać usterek starszych niż 1 dzień. Tylko administrator może to zrobić.`}]});
            return;
        }


        const result = await Fault.deleteFault(Number(req.params.faultid));
        res.status(200).json({status: 'success', data: result})

    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }

}


