
import { NextFunction, Request, Response, response } from 'express'
import Refueling from '../../models/Refueling';

// import Refueling from '../models/Refueling';
// import Car from '../models/Car';
// import User from '../models/User'
// import { addOneRefuelingByNormalUserSchema } from '../models/validation/RefuelingSchemas';


//TODO: ENDPOINT TO EDIT REFUELING - IF SOME VARRIABLES WERE CHANGED - ADD LASTEDITEDBYMODERATOROFID
//TODO: ENDPOINT TO ACKNOWLEDGE BY MODERATOR - JUST UPDATE LAST COLUMN

// export const updateOneRefueling = async (req: Request, res: Response, next: NextFunction) => {
//     //TODO: ONLY LOGGED USER CAN ADD REFUELING
//     //TODO: PASS CORRECT USER ID
//     const data = req.body;
//     if (!data.carID || isNaN(Number(data.carID))) {
//         res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
//         return;
//     }
//     else if (!data.userID || isNaN(Number(data.userID))) {
//         res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
//         return;
//     }
   
//     try {
//         const isCarExist = await Car.fetchOne(Number(data.carID))
//         const isUserExist = await User.fetchOne(Number(data.userID))
//         if(isCarExist && isUserExist) {
//             const newRefueling = new Refueling(null, Number(req.params.carid), 1, null, data.carMileage, data.numberOfLiters, data.costBrutto, data.isFuelCardUsed, false);
//             addOneRefuelingByNormalUserSchema.validateAsync(newRefueling);
//             const lastRefueling = await Refueling.fetchLastRefuelingOfCar(Number(data.carID));
//             if(lastRefueling) {
//                 if(lastRefueling.dataValues.carMileage >= data.carMileage) {
//                     res.status(400).json({status: 'fail', data: [{en: `Entered mileage ${data.carMileage} can not be less than mileage entered while last refueling ${lastRefueling.dataValues.carMileage}.`, pl: `Wpisany przebieg ${data.carMileage} nie może być mniejszy niż przebieg wpisany podczas ostatniego tankowania ${lastRefueling.dataValues.carMileage}.`}]})
//                     return;
//                 }
//             }
//             await newRefueling.addOneRefueling();
//             res.status(200).json({status: 'success', data: data})
//             }
//         else {
//             if(!isCarExist) {
//                 res.status(400).json({status: 'fail', data: [{en: `The car of id: ${data.carID} does not exist in the database.`, pl: `Samochód o ID: ${data.carID} nie istnieje w bazie danych.`}]})
//                 return;
//             }
//             else if (!isUserExist) {
//                 res.status(400).json({status: 'fail', data: [{en: `The user of id: ${data.userID} does not exist in the database.`, pl: `Użytkownik o ID: ${data.userID} nie istnieje w bazie danych.`}]})
//                 return;
//             }
//         }
//         }
//         catch (err) {
//             res.status(500).json({status: 'error', message: err})
//         }
// }


export const acknowledgeOneRefueling = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (!data.refuelingID || isNaN(Number(data.refuelingID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong refuelling ID, which you want to change.', pl: 'Podano złe ID tankowania, które chcesz zmienić.'}]})
        return;
    }
    try {
        const isRefuelingExist = Refueling.fetchOne(Number(data.refuelingID));
        if(!isRefuelingExist) {
            res.status(400).json({status: 'fail', data: [{en: `Refueling of ID: ${data.refuelingID} does not exist in the database.`, pl: `Tankowanie o ID: ${data.refuelingID} nie istnieje w bazie danych.`}]})
            return;
        }
        else {
            const result = await Refueling.acknowledgeRefuelingByModerator(data.refuelingID, data.value);
            //TODO: CHECK IF UPDATEDCOUNT === 1
            res.status(200).json({status: 'success', data: result});
        }
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }

}