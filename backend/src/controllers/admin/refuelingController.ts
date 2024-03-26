import { NextFunction, Request, Response, response } from 'express'
import Refueling from '../../models/Refueling';
import Car from '../../models/Car';
import User from '../../models/User'
import { addOneRefuelingByAdminUserSchema, editOneRefuelingByAdminUserSchema } from '../../models/validation/RefuelingSchemas';
import identifyUserId from '../../utilities/functions/JWT/identifyUserId';






















export const addOneRefueling_POST_admin = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (!req.params.carid || isNaN(Number(req.params.carid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }
    if (!data.userID || isNaN(Number(data.userID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }

    try {
        const isCarExist = await Car.fetchOne(Number(req.params.carid), false)
        const {id: adminID} = await identifyUserId(req.cookies.jwt);
        const isUserExist = await User.fetchOne(Number(data.userID), false)

        if(!isCarExist) {
            res.status(400).json({status: 'fail', data: [{en: `The car of id: ${Number(req.params.carid)} does not exist in the database.`, pl: `Samochód o ID: ${Number(req.params.carid)} nie istnieje w bazie danych.`}]})
            return;
        }

        if (!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${Number(data.userID)} does not exist in the database.`, pl: `Użytkownik o ID: ${Number(data.userID)} nie istnieje w bazie danych.`}]})
            return;
        }

        if (data.isAcknowledgedByModerator !== null && ( Number(data.isAcknowledgedByModerator) !== adminID ))  {
            res.status(400).json({status: 'fail', data: [{en: `You cannot confirm refueling as another administrator with ID: ${Number(data.isAcknowledgedByModerator)}`, pl: `Nie możesz potwierdzić tankowania jako inny administrator o ID: ${Number(data.isAcknowledgedByModerator)}`}]})
            return;
        }

        if (new Date(data.refuelingDate) > new Date())  {
            res.status(400).json({status: 'fail', data: [{en: `The refueling date cannot be in the future.`, pl: `Data tankowania nie może być w przyszłości.`}]})
            return;
        }


        const duplicate = await Refueling.fetchDuplicate(data.carMileage);
        if(duplicate) {
            res.status(400).json({status: 'fail', data: [{en: `The refueling with the same mileage already exists.`, pl: `Tankowanie o takim samym przebiegu już istnieje.`}]})
            return;
        }

        

        
            const newRefueling = new Refueling(null, Number(req.params.carid), Number(data.userID), data.refuelingDate, adminID, data.carMileage, null, data.numberOfLiters, data.costBrutto, null, data.isFuelCardUsed, data.moneyReturned, data.invoiceNumber, data.isAcknowledgedByModerator);
            await addOneRefuelingByAdminUserSchema.validateAsync(newRefueling);

            const costPerLiter: number = Number((data.costBrutto / data.numberOfLiters).toFixed(2));
            newRefueling.changeCostPerLiter(costPerLiter);


            const previousRefueling = await Refueling.findPreviousRefueling(Number(req.params.carid), data.carMileage);
            if(previousRefueling) {
                const averageConsumption: number = Number(((data.numberOfLiters / (data.carMileage - previousRefueling.dataValues.carMileage)) * 100).toFixed(2));
                newRefueling.changeAverageConsumption(averageConsumption);
            }
            else {
                //the first refueling in table for that car
                //average consumption = null\\ (it is already set in the constructor)
            }
            

            let result;
            const nextRefueling = await Refueling.findNextRefueling(Number(req.params.carid), data.carMileage);
            if(nextRefueling) {
                result = await newRefueling.addOneRefuelingAndUpdateNext(nextRefueling.dataValues.id);
            }
            else {
                result = await newRefueling.addOneRefueling();
            }

            res.status(200).json({status: 'success', data: result})
 
        }
        catch (err) {
            console.log(err);
            res.status(500).json({status: 'error', message: err})
        }
}

























export const editOneRefueling_PUT_admin = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    if (!req.params.refuelingid || isNaN(Number(req.params.refuelingid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong refueling ID.', pl: 'Podano złe ID tankowania.'}]})
        return;
    }
    if (!data.userID || isNaN(Number(data.userID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }

    try {
        const {id: adminID} = await identifyUserId(req.cookies.jwt);
        const isRefuelingExist = await Refueling.fetchOne(Number(req.params.refuelingid));
        const isUserExist = await User.fetchOne(Number(data.userID), false)
        if(!isRefuelingExist) {
            res.status(400).json({status: 'fail', data: [{en: `The refueling of id: ${Number(req.params.refuelingid)} does not exist in the database.`, pl: `Tankowanie o ID: ${Number(req.params.refuelingid)} nie istnieje w bazie danych.`}]})
            return;
        }
        if (!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${Number(data.userID)} does not exist in the database.`, pl: `Użytkownik o ID: ${Number(data.userID)} nie istnieje w bazie danych.`}]})
            return;
        }

        const previousRefueling = await Refueling.findPreviousRefueling(isRefuelingExist.dataValues.carID, isRefuelingExist.dataValues.carMileage);
        const nextRefueling = await Refueling.findNextRefueling(isRefuelingExist.dataValues.carID, isRefuelingExist.dataValues.carMileage);

        const refuelingToUpdate = new Refueling(Number(req.params.refuelingid), isRefuelingExist.dataValues.carID, data.userID, data.refuelingDate, adminID, data.carMileage, null, data.numberOfLiters, data.costBrutto, null, data.isFuelCardUsed, data.moneyReturned, data.invoiceNumber, data.isAcknowledgedByModerator);
        await editOneRefuelingByAdminUserSchema.validateAsync(refuelingToUpdate);

        if (new Date(data.refuelingDate) > new Date())  {
            res.status(400).json({status: 'fail', data: [{en: `The refueling date cannot be in the future.`, pl: `Data tankowania nie może być w przyszłości.`}]})
            return;
        }

        const costPerLiter: number = Number((data.costBrutto / data.numberOfLiters).toFixed(2));
        refuelingToUpdate.changeCostPerLiter(costPerLiter);

        let result;
        if(previousRefueling && nextRefueling) {
            //carmileage need to be in range
            if(data.carMileage <= previousRefueling.dataValues.carMileage || data.carMileage >= nextRefueling.dataValues.carMileage) {
                res.status(400).json({status: 'fail', data: [{en: `The mileage entered ${data.carMileage} is not within the range between the previous refueling ${previousRefueling.dataValues.carMileage}km and the next refueling ${nextRefueling.dataValues.carMileage}km. If you need to go beyond this range, your only option is to delete this fueling and add it as a new fueling.`, pl: `Wpisany przebieg ${data.carMileage} nie mieści się w zakresie pomiędzy poprzednim tankowaniem ${previousRefueling.dataValues.carMileage}km a następnym tankowaniem ${nextRefueling.dataValues.carMileage}km. Jeśli musisz wyjść poza ten zakres, to jedyną opcją jest usunięcie tego tankowania i dodanie go jako nowe tankowanie.`}]} )
                return;
            }

            //count new avg consumption
            const averageConsumption: number = Number(((data.numberOfLiters / (data.carMileage - previousRefueling.dataValues.carMileage)) * 100).toFixed(2));
            refuelingToUpdate.changeAverageConsumption(averageConsumption);

            //update next refueling avarageConsumption
            result = await refuelingToUpdate.updateOneRefuelingAndUpdateNext(nextRefueling.dataValues.id);
        
        }
        else if(previousRefueling && !nextRefueling) {
            //carmileage need to remain greater than previous refueling
            if(data.carMileage <= previousRefueling.dataValues.carMileage) {
                res.status(400).json({status: 'fail', data: [{en: `The entered mileage ${data.carMileage}km is less than the previous refueling mileage ${previousRefueling.dataValues.carMileage}km. If you need to go beyond this range, your only option is to delete this fueling and add it as a new fueling.`, pl: `Wpisany przebieg ${data.carMileage}km jest mniejszy niż przebieg poprzedniego tankowania ${previousRefueling.dataValues.carMileage}km. Jeśli musisz wyjść poza ten zakres, to jedyną opcją jest usunięcie tego tankowania i dodanie go jako nowe tankowanie.`}]} )
                return;
            }

            //count new avg consumption
            const averageConsumption: number = Number(((data.numberOfLiters / (data.carMileage - previousRefueling.dataValues.carMileage)) * 100).toFixed(2));
            refuelingToUpdate.changeAverageConsumption(averageConsumption);

            //just edit current refueling
            result = await refuelingToUpdate.updateOneRefueling();


        }
        else if(!previousRefueling && nextRefueling){
            //carmileage need to remain less than next refueling
            if(data.carMileage >= nextRefueling.dataValues.carMileage) {
                res.status(400).json({status: 'fail', data: [{en: `The entered mileage ${data.carMileage}km is greater than the next refueling mileage ${nextRefueling.dataValues.carMileage}km. If you need to go beyond this range, your only option is to delete this fueling and add it as a new fueling.`, pl: `Wpisany przebieg ${data.carMileage}km jest większy niż przebieg następnego tankowania ${nextRefueling.dataValues.carMileage}km. Jeśli musisz wyjść poza ten zakres, to jedyną opcją jest usunięcie tego tankowania i dodanie go jako nowe tankowanie.`}]} )
                return;
            }
            //averageConsumption is null, this is the first refueling in the table for that car
            //but update averageRefueling in the next refueling
            result = await refuelingToUpdate.updateOneRefuelingAndUpdateNext(nextRefueling.dataValues.id); 
        }
        else {
            //the only one refueling in the table for that car
            //just edit and avg consumption is null
            result = await refuelingToUpdate.updateOneRefueling();
        }
        res.status(200).json({status: 'success', data: result})

    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }

}


























export const deleteOneRefueling_DELETE_admin = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.params.refuelingid || isNaN(Number(req.params.refuelingid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong refueling ID.', pl: 'Podano złe ID tankowania.'}]})
        return;
    }

    try {
        const isRefuelingExist = await Refueling.fetchOne(Number(req.params.refuelingid));
        if(!isRefuelingExist) {
            res.status(400).json({status: 'fail', data: [{en: `The refueling of id: ${Number(req.params.refuelingid)} does not exist in the database.`, pl: `Tankowanie o ID: ${Number(req.params.refuelingid)} nie istnieje w bazie danych.`}]})
            return;
        }

        const previousRefueling = await Refueling.findPreviousRefueling(isRefuelingExist.dataValues.carID, isRefuelingExist.dataValues.carMileage);
        const nextRefueling = await Refueling.findNextRefueling(isRefuelingExist.dataValues.carID, isRefuelingExist.dataValues.carMileage);

        let result;
        if(previousRefueling && nextRefueling) {
            //delete current, update next
            result = Refueling.deleteOneRefuelingAndUpdateNext(Number(req.params.refuelingid), nextRefueling.dataValues.id, previousRefueling.dataValues.id , false);
        }
        else if(previousRefueling && !nextRefueling) {
            //just delete current
            result = Refueling.deleteRefueling(Number(req.params.refuelingid));
        }
        else if(!previousRefueling && nextRefueling){
            //delete and update in next avg consumption to null
            result = Refueling.deleteOneRefuelingAndUpdateNext(Number(req.params.refuelingid), nextRefueling.dataValues.id, null,  true);
        }
        else {
            //just delete current
            result = Refueling.deleteRefueling(Number(req.params.refuelingid));
        }
        res.status(200).json({status: 'success', data: result})

    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }

}




























export const acknowledgeOneRefueling_PUT_admin = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (!data.refuelingid || isNaN(Number(data.refuelingid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong refuelling ID, which you want to change.', pl: 'Podano złe ID tankowania, które chcesz zmienić.'}]})
        return;
    }

    

    try {
        const {id: adminID} = await identifyUserId(req.cookies.jwt);
        const isRefuelingExist = Refueling.fetchOne(Number(data.refuelingid));
        if(!isRefuelingExist) {
            res.status(400).json({status: 'fail', data: [{en: `Refueling of ID: ${data.refuelingID} does not exist in the database.`, pl: `Tankowanie o ID: ${data.refuelingID} nie istnieje w bazie danych.`}]})
            return;
        }
        else {
            const result = await Refueling.acknowledgeRefuelingByModerator(data.refuelingID, adminID);
            res.status(200).json({status: 'success', data: result});
        }
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }

}

