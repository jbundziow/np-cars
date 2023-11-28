
import { NextFunction, Request, Response, response } from 'express'
import Rental from '../models/Rental';
import Car from '../models/Car';
import User from '../models/User';
import { addOneNullRentalByNormalUserSchema, addOneRentalByNormalUserSchema, returnCarByNormalUserSchema } from '../models/validation/RentalsSchemas';



export const addOneRentalByNormalUser = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: ONLY LOGGED USER CAN ADD RENTAL!!!
    const data = req.body;
    if (!data.carID || isNaN(Number(data.carID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }
    else if (!data.userID || isNaN(Number(data.userID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }


    try {
        const isCarExist = await Car.fetchOne(Number(data.carID))
        const isUserExist = await User.fetchOne(Number(data.userID))
        if(isCarExist && isUserExist) {
            const lastRentalData = await Rental.fetchLastRentalOfCar(data.carID);
            if (lastRentalData) {
                if(lastRentalData.dataValues.carMileageAfter === null) {
                    if(data.carMileageBefore >= lastRentalData.dataValues.carMileageBefore) {
                        //return last rental
                        //TODO: ADD CORRECT USER
                        const returnCarArgs = {rentalID: lastRentalData.dataValues.id, carID: lastRentalData.dataValues.carID, returnUserID: 12, carMileageAfter: data.carMileageBefore, dateTo: new Date()};
                        await returnCarByNormalUserSchema.validateAsync(returnCarArgs);
                        await Rental.returnCar(returnCarArgs.rentalID, returnCarArgs.carID, returnCarArgs.returnUserID, returnCarArgs.carMileageAfter, returnCarArgs.dateTo);

                        //add new rental
                        const newRental = new Rental(null,data.carID,data.userID,null,null,data.carMileageBefore,null,data.travelDestination,null,new Date(),null);
                        await addOneRentalByNormalUserSchema.validateAsync(newRental);
                        const response = await newRental.addOneRental();
                        res.status(200).json({status: 'success', data: response})
                    }
                    else {
                        res.status(400).json({status: 'fail', data: [{en: 'You have passed a less mileage than mileage of that car in last rental.', pl: 'Wpisano mniejszy przebieg niż został wpisany przy ostatnim wypożyczeniu tego samochodu.'}]})
                        return;
                    }
                }
                else {
                    if(data.carMileageBefore === lastRentalData.dataValues.carMileageAfter) {
                        //add new rental
                        const newRental = new Rental(null,data.carID,data.userID,null,null,data.carMileageBefore,null,data.travelDestination,null,new Date(),null);
                        await addOneRentalByNormalUserSchema.validateAsync(newRental);
                        const response = await newRental.addOneRental();
                        res.status(200).json({status: 'success', data: response})
                    }
                    else if(data.carMileageBefore > lastRentalData.dataValues.carMileageAfter) {
                        //add null (unknown) rental
                        const newNullRental = new Rental(null,data.carID,null,null,null,lastRentalData.dataValues.carMileageAfter,data.carMileageBefore,null,null,new Date(),new Date());
                        await addOneNullRentalByNormalUserSchema.validateAsync(newNullRental);
                        const responseNullRental = await newNullRental.addOneRental();

                        //then add new rental
                        const newRental = new Rental(null,data.carID,data.userID,null,null,data.carMileageBefore,null,data.travelDestination,null,new Date(),null);
                        await addOneRentalByNormalUserSchema.validateAsync(newRental);
                        const responseNewRental = await newRental.addOneRental();
                        res.status(200).json({status: 'success', data: {responseNullRental, responseNewRental}})
                    }
                    else {
                        res.status(400).json({status: 'fail', data: [{en: 'You have passed a less mileage than mileage of that car in last rental.', pl: 'Wpisano mniejszy przebieg niż został wpisany przy ostatnim wypożyczeniu tego samochodu.'}]})
                        return;
                    }
                }
            }
            else {
                //just add new rental (the first for that car)
                const newRental = new Rental(null,data.carID,data.userID,null,null,data.carMileageBefore,null,data.travelDestination,null,new Date(),null);
                await addOneRentalByNormalUserSchema.validateAsync(newRental);
                const response = await newRental.addOneRental();
                res.status(200).json({status: 'success', data: response})
            }
        }
        else {
            if(!isCarExist) {
                res.status(400).json({status: 'fail', data: [{en: `The car of id: ${data.carID} does not exist in the database.`, pl: `Samochód o ID: ${data.carID} nie istnieje w bazie danych.`}]})
                return;
            }
            else if (!isUserExist) {
                res.status(400).json({status: 'fail', data: [{en: `The user of id: ${data.userID} does not exist in the database.`, pl: `Użytkownik o ID: ${data.userID} nie istnieje w bazie danych.`}]})
                return;
            }
        }
    }
    catch (error) {
        res.status(500).json({status: 'error', message: error?.toString()})
    }
}