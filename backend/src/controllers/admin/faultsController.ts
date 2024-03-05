import { NextFunction, Request, Response, response } from 'express'
import identifyUserId from '../../utilities/functions/JWT/identifyUserId';
import Fault from '../../models/Fault';
import User from '../../models/User';
import { editOneRefuelingByAdminUserSchema } from '../../models/validation/RefuelingSchemas';








export const editOneFault_PUT_admin = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    if (!req.params.faultid || isNaN(Number(req.params.faultid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong fault ID.', pl: 'Podano złe ID usterki.'}]})
        return;
    }
    if (!data.userID || isNaN(Number(data.userID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }

    try {
        const {id: adminID} = await identifyUserId(req.cookies.jwt);
        const isFaultExist = await Fault.fetchOne(Number(req.params.faultid));
        const isUserExist = await User.fetchOne(Number(data.userID), false);
        if(!isFaultExist) {
            res.status(400).json({status: 'fail', data: [{en: `The fault of id: ${Number(req.params.faultid)} does not exist in the database.`, pl: `Usterka o ID: ${Number(req.params.faultid)} nie istnieje w bazie danych.`}]})
            return;
        }
        if(!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${Number(data.userID)} does not exist in the database.`, pl: `Użytkownik o ID: ${Number(data.userID)} nie istnieje w bazie danych.`}]})
            return;
        }

        const faultToUpdate = new Fault(Number(req.params.faultid), isFaultExist.dataValues.carID, data.userID, adminID, new Date(), data.title, data.description, data.status, data.resultDescription, data.repairCost);
        await editOneRefuelingByAdminUserSchema.validateAsync(faultToUpdate);

        const result = await faultToUpdate.updateOneFault();
        res.status(200).json({status: 'success', data: result})

        

    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }

}















export const deleteOneFault_DELETE_admin = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.params.faultid || isNaN(Number(req.params.faultid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong fault ID.', pl: 'Podano złe ID usterki.'}]})
        return;
    }

    try {
        const isFaultExist = await Fault.fetchOne(Number(req.params.faultid));
        if(!isFaultExist) {
            res.status(400).json({status: 'fail', data: [{en: `The fault of id: ${Number(req.params.faultid)} does not exist in the database.`, pl: `Usterka o ID: ${Number(req.params.faultid)} nie istnieje w bazie danych.`}]})
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















export const acknowledgeOneFault_PUT_admin = async (req: Request, res: Response, next: NextFunction) => {
    
    const data = req.body;

    if (!data.faultid || isNaN(Number(data.faultid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong fault ID.', pl: 'Podano złe ID usterki.'}]})
        return;
    }

    

    try {
        const {id: adminID} = await identifyUserId(req.cookies.jwt);

        const isFaultExist = await Fault.fetchOne(Number(data.faultid));
        if(!isFaultExist) {
            res.status(400).json({status: 'fail', data: [{en: `The fault of id: ${Number(data.faultid)} does not exist in the database.`, pl: `Usterka o ID: ${Number(data.faultid)} nie istnieje w bazie danych.`}]})
            return;
        }
        if(isFaultExist.dataValues.status !== 'pending') {
            res.status(400).json({status: 'fail', data: [{en: `The fault of id: ${Number(data.faultid)} does not have status "pending".`, pl: `Usterka o ID: ${Number(data.faultid)} nie ma aktualnie statusu "Do akceptacji".`}]})
            return;
        }

        
        const result = await Fault.acknowledgeFaultByModerator(Number(data.faultid), adminID);
        res.status(200).json({status: 'success', data: result});
        
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }

}

