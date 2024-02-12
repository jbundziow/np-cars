
import { NextFunction, Request, Response, response } from 'express'
import Rental from '../models/Rental';
import Car from '../models/Car';
import User from '../models/User';
import { addOneNullRentalByNormalUserSchema, addOneRentalByNormalUserSchema, returnCarByNormalUserSchema } from '../models/validation/RentalsSchemas';
import { isDateString } from '../utilities/functions/isDateString';
import identifyUserId from '../utilities/functions/identifyUserId';


export const fetchOneRental = async (req: Request, res: Response, next: NextFunction) => {
    const rentalID = req.params.rentalid;
    if (!rentalID || isNaN(Number(rentalID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong rental ID.', pl: 'Podano złe ID wypożyczenia.'}]})
        return;
    }

    const rental = await Rental.fetchOne(Number(rentalID));
    if(rental) {
        res.status(200).json({status: 'success', data: rental})
    }
    else {
        res.status(400).json({status: 'fail', data: [{en: `Rental of ID: ${req.params.rentalid} is not found in the database.`, pl: `Wypożyczenie o ID: ${req.params.rentalid} nie zostało znalezione w bazie danych.`}]})
        return;
    }
}

export const addOneRentalByNormalUser = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (!data.carID || isNaN(Number(data.carID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }

    try {
        const isCarExist = await Car.fetchOne(Number(data.carID))
        const userID = await identifyUserId(req.cookies.jwt);
        const isUserExist = await User.fetchOne(userID)
        if(isCarExist && isUserExist) {
            if(isCarExist.dataValues.availabilityStatus !== 'rented' && isCarExist.dataValues.availabilityStatus !== 'available') {
                res.status(400).json({status: 'fail', data: [{en: `You cannot rent a car that has status '${isCarExist.dataValues.availabilityStatus}'.`, pl: `Nie można wypożyczyć samochodu o statusie '${isCarExist.dataValues.availabilityStatus}'.`}]})
                return;
            }
            const lastRentalData = await Rental.fetchLastRentalOfCar(data.carID);
            if (lastRentalData) {
                if(lastRentalData.dataValues.carMileageAfter === null) {
                    if(lastRentalData.dataValues.userID === userID) {
                        res.status(400).json({status: 'fail', data: [{en: `This car is currently rented by you with a starting mileage of ${lastRentalData.dataValues.carMileageBefore}km. Return it first by entering the destination of your previous trip, and then rent it again.`, pl: `Ten samochód jest aktualnie wypożyczony przez Ciebie z przebiegem początkowym ${lastRentalData.dataValues.carMileageBefore}km. Zwróć go najpierw wpisując cel poprzedniej podróży, a potem wypożycz ponownie.`}]})
                        return;
                    }
                    if(data.carMileageBefore >= lastRentalData.dataValues.carMileageBefore) {
                        //return last rental
                        const returnCarArgs = {rentalID: lastRentalData.dataValues.id, carID: lastRentalData.dataValues.carID, returnUserID: userID, carMileageAfter: data.carMileageBefore, dateTo: new Date(), travelDestination: lastRentalData.dataValues.travelDestination};
                        await returnCarByNormalUserSchema.validateAsync(returnCarArgs);
                        await Rental.returnCar(returnCarArgs.rentalID, returnCarArgs.carID, returnCarArgs.returnUserID, returnCarArgs.carMileageAfter, returnCarArgs.dateTo,returnCarArgs.travelDestination);

                        //add new rental
                        const newRental = new Rental(null,data.carID,userID,null,null,data.carMileageBefore,null,data.travelDestination,null,new Date(),null);
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
                        const newRental = new Rental(null,data.carID,userID,null,null,data.carMileageBefore,null,data.travelDestination,null,new Date(),null);
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
                        const newRental = new Rental(null,data.carID,userID,null,null,data.carMileageBefore,null,data.travelDestination,null,new Date(),null);
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
                const newRental = new Rental(null,data.carID,userID,null,null,data.carMileageBefore,null,data.travelDestination,null,new Date(),null);
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
                res.status(400).json({status: 'fail', data: [{en: `The user of id: ${userID} does not exist in the database.`, pl: `Użytkownik o ID: ${data.userID} nie istnieje w bazie danych.`}]})
                return;
            }
        }
    }
    catch (error) {
        res.status(500).json({status: 'error', message: error?.toString()})
    }
}


export const returnCarByNormalUser = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: ONLY LOGGED USER CAN RETURN CAR!!!
    const data = req.body;
    if (!data.rentalID || isNaN(Number(data.rentalID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong rental ID.', pl: 'Podano złe ID wypożyczenia.'}]})
        return;
    }
    else if (!data.carID || isNaN(Number(data.carID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }
    else if (!data.returnUserID || isNaN(Number(data.returnUserID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong returnUserID.', pl: 'Podano złe ID użytkownika dokonującego zwrotu samochodu (wypożyczenia).'}]})
        return;
    }
    else if (!data.carMileageAfter || isNaN(Number(data.carMileageAfter))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong carMileageAfter.', pl: 'Podano zły przebieg końcowy.'}]})
        return;
    }

    try {
    const rental = await Rental.fetchOne(data.rentalID);
    if(rental) {
        if(rental.dataValues.carMileageAfter !== null) {
            res.status(400).json({status: 'fail', data: [{en: `The rental of ID: ${data.rentalID} is already finished (car mileage after was passed).`, pl: `To wypożyczenie o ID: ${data.rentalID} zostało już wcześniej zwrócone.`}]})
            return;
        }

        const carData = await Car.fetchOne(Number(data.carID))
        const isReturnUserExist = await User.fetchOne(Number(data.returnUserID))
        if(carData && data.carID === rental.dataValues.carID) {
            if(isReturnUserExist) {
                if(data.carMileageAfter < rental.dataValues.carMileageBefore) {
                    res.status(400).json({status: 'fail', data: [{en: `carMileageAfter ${data.carMileageAfter} cannot be less than carMileageBefore ${rental.dataValues.carMileageBefore}.`, pl: `Przebieg końcowy wypożyczenia ${data.carMileageAfter} nie może być mniejszy niż przebieg początkowy ${rental.dataValues.carMileageBefore}.`}]})
                    return; 
                }
                else {
                    if (!isDateString(data.dateTo) || !isDateString(rental.dataValues.dateFrom)) {
                        res.status(400).json({status: 'fail', data: [{en: `You have passed a wrong date format.`, pl: `Wprowadzono zły format daty.`}]})
                        return; 
                    }

                    if(new Date(data.dateTo) < new Date(rental.dataValues.dateFrom)) {
                        res.status(400).json({status: 'fail', data: [{en: `dateTo ${new Date(data.dateTo).toISOString()} cannot be earlier than dateFrom ${new Date(rental.dataValues.dateFrom).toISOString()}.`, pl: `Data końcowa wypożyczenia ${new Date(data.dateTo).toISOString()} nie może być wcześniejsza niż data początkowa ${new Date(rental.dataValues.dateFrom).toISOString()}.`}]})
                        return; 
                    }
                    else {
                        if (!data.travelDestination) {
                            res.status(400).json({status: 'fail', data: [{en: `Field 'travelDestination' cannot be empty.`, pl: `Pole 'Cel podróży' nie może być puste.`}]})
                            return; 
                        }
                        else {
                            //everything is OK
                            await returnCarByNormalUserSchema.validateAsync(data);
                            await Rental.returnCar(data.rentalID, data.carID, data.returnUserID, data.carMileageAfter, data.dateTo, data.travelDestination);
                            res.status(200).json({status: 'success', data: data})
                        }
                    }
                }
            }
            else {
                res.status(400).json({status: 'fail', data: [{en: `The user of ID: ${data.returnUserID}, who want to return a car (rental) does not exist in the database.`, pl: `Użytkownik o ID: ${data.returnUserID}, który chce dokonać zwrotu samochodu (wypożyczenia) nie istnieje w bazie danych.`}]})
                return; 
            }
        }
        else {
            res.status(400).json({status: 'fail', data: [{en: `The car of ID: ${data.carID} does not exist in the database or it is different than carID in the 'Rental' table: ${rental.dataValues.carID}.`, pl: `Auto o ID: ${data.carID} nie istnieje w bazie danych lub jest inne niż ID auta wskazane w wypożyczeniu: ${rental.dataValues.carID}.`}]})
            return; 
        }
    }
    else {
        res.status(400).json({status: 'fail', data: [{en: `Rental of ID: ${data.rentalID} doesn not exist in the database.`, pl: `Wypożyczenie o ID: ${data.rentalID} nie istnieje w bazie danych.`}]})
        return;
    }

    }
    catch (error) {
        res.status(500).json({status: 'error', message: error?.toString()})
    }
}


export const fetchLastRentalOfCar = async (req: Request, res: Response, next: NextFunction) => {
    if (!isNaN(Number(req.params.carid))) {
        try {
            const isCarExist = await Car.fetchOne(Number(req.params.carid));
            if (isCarExist) {
                const lastReservaton = await Rental.fetchLastRentalOfCar(Number(req.params.carid))
                res.status(200).json({status: 'success', data: lastReservaton})
            }
            else {
                res.status(400).json({status: 'fail', data: [{en: `The car of id: ${Number(req.params.carid)} does not exist in the database.`, pl: `Samochód o ID: ${Number(req.params.carid)} nie istnieje w bazie danych.`}]})
                return;
            }
        }
        catch(e) {
            res.status(500).json({status: 'error', message: e})
        }
    }
    else {
    res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]});
    }   
}


export const fetchAllRentalsOfUser = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: CHECK IF PASSED :userid IS CURRENT USER
    if (!isNaN(Number(req.params.userid))) {
        try {
            const isUserExist = await User.fetchOne(Number(req.params.userid));
            if (isUserExist) {
                let dbResponse;

                if(!req.query.type || req.query.type === 'all') {
                    dbResponse = await Rental.fetchAllRentalsOfUser(Number(req.params.userid), 'all');
                }
                else if(req.query.type === 'pending') {
                    dbResponse = await Rental.fetchAllRentalsOfUser(Number(req.params.userid), 'pending');
                }
                else if(req.query.type === 'closed') {
                    dbResponse = await Rental.fetchAllRentalsOfUser(Number(req.params.userid), 'closed');
                }
                else {
                    res.status(400).json({status: 'fail', data: [{en: `You have passed a wrong 'type' in query params. It should be null, 'all', 'pending' or 'closed'.`, pl: `Podałeś złe 'type' w linku jako query params. Prawidłowe wartości to null, 'all', 'pending', 'closed'.`}]})
                    return;
                }

                let response = [];
                for await (const item of dbResponse) {
                    const carBasicData = await Car.fetchOneBasicData(Number(item.dataValues.carID));
                    response.push({...item.dataValues, carBasicData: carBasicData?.dataValues})
                }

                res.status(200).json({status: 'success', data: response})

            }
            else {
                res.status(400).json({status: 'fail', data: [{en: `The user of id: ${Number(req.params.userid)} does not exist in the database.`, pl: `Użytkownik o ID: ${Number(req.params.userid)} nie istnieje w bazie danych.`}]})
                return;
            }
        }
        catch(e) {
            res.status(500).json({status: 'error', message: e})
        }
    }
    else {
    res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]});
    }   
}

