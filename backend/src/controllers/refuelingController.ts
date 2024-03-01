
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
                //average consumption === null (it is alrady set in the constructor)
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

    let sortFromOldest = false;
    if(req.query.sortfromoldest && req.query.sortfromoldest === 'true') {sortFromOldest = true}

        try {
            const pageNumber = Number(req.query.pagenumber);
            const pageSize = Number(req.query.pagesize);

            const receivedQueryString = req.query.filters.toString();
            let filtersObj = JSON.parse(receivedQueryString);
            filtersObj = removeEmptyValuesFromObject(filtersObj)
            await filtersObjRefuelingSchema.validateAsync(filtersObj)
            const response = await Refueling.fetchAllRefuelingsWithFilters(filtersObj, pageSize, pageNumber, sortFromOldest)
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
        lastRefuelingWasKmAgo: number | null,
        predictedFuelLevel: number | null,
    }

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