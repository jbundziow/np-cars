
import { NextFunction, Request, Response, response } from 'express'

import Refueling from '../models/Refueling';
import Car from '../models/Car';
import User from '../models/User'
import Rental from '../models/Rental'
import { addOneRefuelingByNormalUserSchema, filtersObjRefuelingSchema } from '../models/validation/RefuelingSchemas';
import identifyUserId from '../utilities/functions/JWT/identifyUserId';
import removeEmptyValuesFromObject from '../utilities/functions/removeEmptyValuesFromObject';



















export const addOneRefueling_POST_user = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (!req.params.carid || isNaN(Number(req.params.carid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }

    try {
        const isCarExist = await Car.fetchOne(Number(req.params.carid), false)
        const {id: userID} = await identifyUserId(req.cookies.jwt);
        const isUserExist = await User.fetchOne(userID, false)

        if(!isCarExist) {
            res.status(400).json({status: 'fail', data: [{en: `The car of id: ${Number(req.params.carid)} does not exist in the database.`, pl: `Samochód o ID: ${Number(req.params.carid)} nie istnieje w bazie danych.`}]})
            return;
        }

        if (!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${userID} does not exist in the database.`, pl: `Użytkownik o ID: ${userID} nie istnieje w bazie danych.`}]})
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

        
            const newRefueling = new Refueling(null, Number(req.params.carid), userID, data.refuelingDate, null, data.carMileage, null, data.numberOfLiters, data.costBrutto, null, data.isFuelCardUsed, data.moneyReturned, null, null);
            await addOneRefuelingByNormalUserSchema.validateAsync(newRefueling);

            const lastRentalOfCar = await Rental.fetchLastRentalOfCar(Number(req.params.carid));
            if(lastRentalOfCar) {
                const actualCarMileage: number = lastRentalOfCar.dataValues.carMileageAfter || lastRentalOfCar.dataValues.carMileageBefore;
                if(actualCarMileage - 5000 > data.carMileage) {
                    res.status(400).json({status: 'fail', data: [{en: `Entered mileage: ${data.carMileage} is much lower than the mileage entered during the last rental of this car: ${actualCarMileage}. The permissible difference is 5000 km.`, pl: `Wpisany przebieg: ${data.carMileage} jest dużo mniejszy niż przebieg wpisany podczas ostatniego wypożyczenia tego samochodu: ${actualCarMileage}. Dopuszczalna różnica to 5000 km.`}]} )
                    return;
                }

            }

            const lastRefueling = await Refueling.fetchLastRefuelingOfCar(Number(req.params.carid));
            if(lastRefueling) {
                if(lastRefueling.dataValues.carMileage >= data.carMileage) {
                    res.status(400).json({status: 'fail', data: [{en: `Entered mileage: ${data.carMileage} can not be less than mileage entered while last refueling this car: ${lastRefueling.dataValues.carMileage}.`, pl: `Wpisany przebieg: ${data.carMileage} nie może być mniejszy niż przebieg wpisany podczas ostatniego tankowania tego samochodu: ${lastRefueling.dataValues.carMileage}.`}]})
                    return;
                }
                const averageConsumption: number = Number(((data.numberOfLiters / (data.carMileage - lastRefueling.dataValues.carMileage)) * 100).toFixed(2));
                newRefueling.changeAverageConsumption(averageConsumption);
            }
            else {
                //average consumption = null\\ (it is already set in the constructor)
            }
            const costPerLiter: number = Number((data.costBrutto / data.numberOfLiters).toFixed(2));
            newRefueling.changeCostPerLiter(costPerLiter);

            await newRefueling.addOneRefueling();
            res.status(200).json({status: 'success', data: data})
 
        }
        catch (err) {
            console.log(err);
            res.status(500).json({status: 'error', message: err})
        }
}





















export const fetchAllRefuelingsWithFilters_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const validSortOptions = ["createdAt", "updatedAt", "refuelingDate", "carMileage", "numberOfLiters", "averageConsumption", "costBrutto", "costPerLiter", "isFuelCardUsed", "moneyReturned", "invoiceNumber", "id", "carID", "userID", "isAcknowledgedByModerator", "lastEditedByModeratorOfID"];
    
    if(!req.query.filters) {
        res.status(400).json({status: 'fail', data: [{en: `No query param 'filters' passed.`, pl: `Nie przekazano 'filters' w parametrach zapytania.`}]})
        return;
    }
    if(!req.query.pagenumber || isNaN(Number(req.query.pagenumber))) {
        res.status(400).json({status: 'fail', data: [{en: `No query param 'pagenumber' passed or it is not a number.`, pl: `Nie przekazano 'pagenumber' w parametrach zapytania lub nie jest to cyfra.`}]})
        return;
    }
    if(!req.query.pagesize || isNaN(Number(req.query.pagesize))) {
        res.status(400).json({status: 'fail', data: [{en: `No query param 'pagesize' passed or it is not a number.`, pl: `Nie przekazano 'pagesize' w parametrach zapytania lub nie jest to cyfra.`}]})
        return;
    }
    if(!req.query.sortby || !validSortOptions.includes(req.query.sortby.toString())) {
        res.status(400).json({status: 'fail', data: [{en: `No query param 'sortby' passed or passed a wrong value. Available options: ${validSortOptions.map(option => ` "${option}"`)}.`, pl: `Nie przekazano 'sortby' w parametrach zapytania lub przekazano nieprawidłową wartość. Dostępne opcje to: ${validSortOptions.map(option => ` "${option}"`)}.`}]})
        return;
    }
    if(!req.query.sortorder || (req.query.sortorder !== 'ASC' && req.query.sortorder !== 'DESC')) {
        res.status(400).json({status: 'fail', data: [{en: `No query param 'sortorder' passed. It should be 'ASC' or 'DESC'.`, pl: `Nie przekazano 'sortorder' w parametrach zapytania. Powinno to być 'ASC' lub 'DESC'.`}]})
        return;
    }



        try {
            const pageNumber = Number(req.query.pagenumber);
            const pageSize = Number(req.query.pagesize);

            const receivedQueryString = req.query.filters.toString();
            let filtersObj = JSON.parse(receivedQueryString);
            filtersObj = removeEmptyValuesFromObject(filtersObj)
            await filtersObjRefuelingSchema.validateAsync(filtersObj)
            const response = await Refueling.fetchAllRefuelingsWithFilters(filtersObj, pageSize, pageNumber, req.query.sortby.toString(), req.query.sortorder)
            res.status(200).json({status: 'success', data: response.records, pagination: response.pagination, totalNumberOfLiters: response.totalNumberOfLiters.toFixed(2), averageConsumption: response.averageConsumption?.toFixed(2), totalCostBrutto: response.totalCostBrutto.toFixed(2), averageCostPerLiter: response.averageCostPerLiter?.toFixed(2)})

        }
        catch(e) {
            res.status(500).json({status: 'error', message: e})
        }
}


















export const fetchLastRefuelingAndFuelLevelOfAllCars_GET_user = async (req: Request, res: Response, next: NextFunction) => {

    interface oneCarResponseData {
        carID: number,
        carBrand: string,
        carModel: string,
        imgPath: string,
        lastRefuelingWasKmAgo: number | null,
        predictedFuelLevel: number | null,
    }
    try {
        const allCarsBasicData = await Car.fetchAll(false);

        if(!allCarsBasicData || allCarsBasicData.length < 1) {
            res.status(400).json({status: 'fail', data: [{en: `No cars found in the database.`, pl: `Nie znaleziono żadnych samochodów w bazie danych.`}]})
            return;
        }

        let response: oneCarResponseData[] = [];

        for await (const carObj of allCarsBasicData) {
            const lastRefuelingOfCar = await Refueling.fetchLastRefuelingOfCar(carObj.dataValues.id);
            const lastRentalOfCar = await Rental.fetchLastRentalOfCar(carObj.dataValues.id);
            const averageConsumption = await Refueling.fetchAverageConsumptionOfCar(carObj.dataValues.id);
            
            let data: oneCarResponseData = {
                carID: carObj.dataValues.id,
                carBrand: carObj.dataValues.brand,
                carModel: carObj.dataValues.model,
                imgPath: carObj.dataValues.imgPath,
                lastRefuelingWasKmAgo: null,
                predictedFuelLevel: null,
            }

            if(lastRefuelingOfCar && lastRentalOfCar) {
                const actualCarMileage = lastRentalOfCar.dataValues.carMileageAfter || lastRentalOfCar.dataValues.carMileageBefore;
                const lastRefuelingCarMileage = lastRefuelingOfCar.dataValues.carMileage;
                const lastRefuelingWasKmAgo = actualCarMileage - lastRefuelingCarMileage;
                if(lastRefuelingWasKmAgo >= 0) { data.lastRefuelingWasKmAgo = lastRefuelingWasKmAgo }

                if(averageConsumption && carObj.dataValues.tankCapacity) {
                    const totalFuelUsed = (actualCarMileage - lastRefuelingCarMileage) / 100 * averageConsumption ; //[liters]
                    const predictedFuelLevel = (carObj.dataValues.tankCapacity - totalFuelUsed) / carObj.dataValues.tankCapacity * 100;
                    if(predictedFuelLevel >= 0 && predictedFuelLevel <= 100) { data.predictedFuelLevel = Number(predictedFuelLevel.toFixed(2)) }
                }
            }
            response.push(data);
        }

        res.status(200).json({status: 'success', data: response})
    }
    catch(e) {
        res.status(500).json({status: 'error', message: e})
    }


}



















export const deleteLastRefueling_DELETE_user = async (req: Request, res: Response, next: NextFunction) => {

    const data = req.body;
    if (!data.refuelingID || isNaN(Number(data.refuelingID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong refueling ID.', pl: 'Podano złe ID tankowania.'}]})
        return;
    }

    if (!data.carID || isNaN(Number(data.carID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }


    try {
        const isCarExist = await Car.fetchOne(Number(data.carID), false)
        const {id: userID} = await identifyUserId(req.cookies.jwt);
        const isUserExist = await User.fetchOne(userID, false);

        if(!isCarExist) {
            res.status(400).json({status: 'fail', data: [{en: `The car of id: ${Number(data.carID)} does not exist in the database.`, pl: `Samochód o ID: ${Number(data.carID)} nie istnieje w bazie danych.`}]})
            return;
        }

        if (!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${userID} does not exist in the database.`, pl: `Użytkownik o ID: ${userID} nie istnieje w bazie danych.`}]})
            return;
        }

        const lastRefuelingOfCar = await Refueling.fetchLastRefuelingOfCar(Number(data.carID));
        
        if(!lastRefuelingOfCar) {
            res.status(400).json({status: 'fail', data: [{en: `No refueling found for the car of ID: ${Number(data.carID)}.`, pl: `Nie znaleziono tankowania dla samochodu o ID: ${Number(data.carID)}.`}]})
            return;
        }

        if(lastRefuelingOfCar.dataValues.id !== Number(data.refuelingID)) {
            res.status(400).json({status: 'fail', data: [{en: `The refueling of ID: ${Number(data.refuelingID)} is not the last refueling of the car of ID: ${Number(data.carID)}.`, pl: `Tankowanie o ID: ${Number(data.refuelingID)} nie jest ostatnim tankowaniem samochodu o ID: ${Number(data.carID)}.`}]})
            return;
        }

        if(lastRefuelingOfCar.dataValues.userID !== userID) {
            res.status(400).json({status: 'fail', data: [{en: `You are not allowed to delete this refueling. It does not belongs to you.`, pl: `Nie masz uprawnień do usunięcia tego tankowania. Nie należy do Ciebie.`}]})
            return;
        }

        const lastRefuelingOfUser = await Refueling.fetchLastRefuelingOfUser(userID);
        if(!lastRefuelingOfUser) {
            res.status(400).json({status: 'fail', data: [{en: `No refueling found for the user of ID: ${userID}.`, pl: `Nie znaleziono tankowania dla użytkownika o ID: ${userID}.`}]})
            return;
        }
        else {
            if(lastRefuelingOfUser.dataValues.id !== Number(data.refuelingID)) {
                res.status(400).json({status: 'fail', data: [{en: `The refueling of ID: ${Number(data.refuelingID)} is not the last refueling of the user of ID: ${userID}. The user can delete only his last refueling.`, pl: `Tankowanie o ID: ${Number(data.refuelingID)} nie jest ostatnim tankowaniem użytkownika o ID: ${userID}. Użytkownik może usunąć tylko ostatnie swoje tankowanie.`}]})
                return;
            }
        }

        
        const refuelingDate = new Date(lastRefuelingOfCar.dataValues.refuelingDate);
        const today_from = new Date().setHours(0, 0, 0, 0);
        const today_to = new Date().setHours(23, 59, 59, 999);
        if(refuelingDate < new Date(today_from) || refuelingDate > new Date(today_to)) {
            res.status(400).json({ status: 'fail', data: [{ en: `As a user, you can only delete the refueling you made today.`, pl: `Jako użytkownik możesz usunąć tylko tankowanie, którego dokonałeś dzisiaj.` }] })
            return;
        }



        const response = await Refueling.deleteRefueling(Number(data.refuelingID));
        res.status(200).json({status: 'success', data: response})

    }
    catch(e) {
        res.status(500).json({status: 'error', message: e})
    }

}

















export const fetchOneRefueling_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const refuelingID = req.params.refuelingid;
    if (!refuelingID || isNaN(Number(refuelingID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong refueling ID.', pl: 'Podano złe ID tankowania.'}]})
        return;
    }

    const refueling = await Refueling.fetchOne(Number(refuelingID));
    if(refueling) {
        res.status(200).json({status: 'success', data: refueling})
    }
    else {
        res.status(400).json({status: 'fail', data: [{en: `Refueling of ID: ${req.params.refuelingid} is not found in the database.`, pl: `Tankowanie o ID: ${req.params.refuelingid} nie zostało znalezione w bazie danych.`}]})
        return;
    }
}