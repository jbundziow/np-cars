import { NextFunction, Request, Response, response } from 'express'
import Rental from '../../models/Rental';
import Car from '../../models/Car';
import User from '../../models/User';
import identifyUserId from '../../utilities/functions/JWT/identifyUserId';
import Place from '../../models/Place';
import { addOneFinishedRentalByAdminUserSchema, addOneUnfinishedRentalByAdminUserSchema } from '../../models/validation/RentalsSchemas';





export const addOneRentalAsAdmin_POST_admin = async (req: Request, res: Response, next: NextFunction) => { 
    const data = req.body;

    if (!req.query.alsoreturn || (req.query.alsoreturn !== 'false' && req.query.alsoreturn !== 'true')) {
        res.status(400).json({status: 'fail', data: [{en: `You have passed a wrong 'alsoreturn' in query params.`, pl: `Podano złą wartość 'alsoreturn' w parametrach zapytania.`}]})
        return;
    }
    const alsoReturn = req.query.alsoreturn === 'true' ? true : false;

    if(alsoReturn) {
        if (!data.returnUserID || isNaN(Number(data.returnUserID))) {
            res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong returnUserID.', pl: 'Podano złe ID użytkownika zwracającego samochód.'}]})
            return;
        }
        const isReturnUserExist = await User.fetchOne(Number(data.returnUserID), false);
        if (!isReturnUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user who returns rental of id: ${data.returnUserID} does not exist in the database.`, pl: `Użytkownik zwracający samochód o ID: ${data.returnUserID} nie istnieje w bazie danych.`}]})
            return;
        }
    }

    

    
    if (!data.carID || isNaN(Number(data.carID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }
    if (!data.userID || isNaN(Number(data.userID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }
    if (!data.carMileageBefore || isNaN(Number(data.carMileageBefore))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong carMileageBefore value.', pl: 'Podano zły przebieg początkowy.'}]})
        return;
    }
    

    if (data.returnUserID && isNaN(Number(data.returnUserID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong returnUserID.', pl: 'Podano złe ID użytkownika zwracającego wypożyczenie.'}]})
        return;
    }

    try {
        const isCarExist = await Car.fetchOne(Number(data.carID), false)
        const isUserExist = await User.fetchOne(Number(data.userID), false)
        // const {id: currentAdminUserID} = await identifyUserId(req.cookies.jwt);
        if(!isCarExist) {
            res.status(400).json({status: 'fail', data: [{en: `The car of id: ${data.carID} does not exist in the database.`, pl: `Samochód o ID: ${data.carID} nie istnieje w bazie danych.`}]})
            return;
        }
        if (!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${data.userID} does not exist in the database.`, pl: `Użytkownik o ID: ${data.userID} nie istnieje w bazie danych.`}]})
            return;
        }




        let finalModeratorAcknowledgeID = null;
        if(data.lastEditeByModeratorOfID && !isNaN(Number(data.lastEditeByModeratorOfID))) {
            const {id: currentAdminUserID} = await identifyUserId(req.cookies.jwt);
            if(currentAdminUserID === Number(data.lastEditeByModeratorOfID)) {
                finalModeratorAcknowledgeID = currentAdminUserID;
            }
            else {
                res.status(400).json({status: 'fail', data: [{en: `You cannot pass the ID of the moderator who is not you.`, pl: `Nie możesz podać ID moderatora, którym nie jesteś ty.`}]});
                return;
            }
        }

        let finalPlaceID = null;
        if(data.placeID && !isNaN(Number(data.placeID))) {
            const isPlaceExist = await Place.fetchOne(Number(data.placeID), false);
            if(isPlaceExist) {
                finalPlaceID = Number(data.placeID);
            }
            else {
                res.status(400).json({status: 'fail', data: [{en: `The place of id: ${Number(data.placeID)} does not exist in the database.`, pl: `Miejsce o ID: ${Number(data.placeID)} nie istnieje w bazie danych.`}]});
                return;
            }
        }

        


        const lastRental = await Rental.fetchLastRentalOfCar(Number(data.carID));
        if(!lastRental) {
            res.status(400).json({status: 'fail', data: [{en: `The first rental in the database for a given car must be added in the traditional way.`, pl: `Pierwsze wypożyczenie w bazie danych dla danego samochodu musi być dodane w tradycyjny sposób.`}]});
        }
        if(lastRental && lastRental.dataValues.returnUserID === null && Number(data.carMileageBefore) >= lastRental.dataValues.carMileageBefore) {
            res.status(400).json({status: 'fail', data: [{en: `You cannot add a rental with the highest starting mileage to date if the previous rental for that car has not been returned.`, pl: `Nie możesz dodać wypożyczenia z najwyższym przebiegiem początkowym jaki istnieje do tej pory, jeśli poprzednie wypożyczenie dla tego samochodu nie zostało zwrócone.`}]});
        }



        const gapsData = await Rental.findMileageGaps(Number(data.carID), false);

        
        if(!alsoReturn) { //NEWEST RENTAL
            if(Number(data.carMileageBefore) >= gapsData.lastMileage) {
                const newRental = new Rental(null, Number(data.carID), Number(data.userID), null, finalModeratorAcknowledgeID, Number(data.carMileageBefore), null, null, data.travelDestination, finalPlaceID, data.dateFrom, null);
                await addOneUnfinishedRentalByAdminUserSchema.validateAsync(newRental);
                const result = await newRental.addOneRental(); //availibilityStatus of car will be changed in the model to 'rented'
                res.status(200).json({status: 'success', data: result})
                return;
            }
            else {
                res.status(400).json({status: 'fail', data: [{en: `You cannot add a rental without entering the final mileage unless it is the most recent rental (with the highest possible starting mileage).`, pl: `Nie możesz dodać wypożyczenia bez wprowadzonego przebiegu końcowego, jeśli nie jest to najnowsze wypożyczenie (o najwyższym możliwym przebiegu początkowym).`}]});
                return;
            }
        }
        else {
            const newFinishedRental = new Rental(null, Number(data.carID), Number(data.userID), Number(data.returnUserID), finalModeratorAcknowledgeID, Number(data.carMileageBefore), Number(data.carMileageAfter), null, data.travelDestination, finalPlaceID, data.dateFrom, data.dateTo);
            await addOneFinishedRentalByAdminUserSchema.validateAsync(newFinishedRental);
            
            
            if(data.carMileageAfter <= gapsData.firstMileage) { //before first rental in the table for car
                const result = await newFinishedRental.addOneFinishedRental();
                res.status(200).json({status: 'success', data: result})
                return;
            }
            else if(Array.isArray(gapsData.gaps) && gapsData.gaps.length > 0) { //between rentals in 'gaps'[]
                for (const gap of gapsData.gaps) {
                    if(data.carMileageBefore >= gap.gapStart && data.carMileageAfter <= gap.gapEnd) {
                        const result = await newFinishedRental.addOneFinishedRental();
                        res.status(200).json({status: 'success', data: result})
                        return;
                    }
                }
            }
            else if(data.carMileageBefore >= gapsData.lastMileage) { //after last rental in the table for car
                const result = await newFinishedRental.addOneFinishedRental();
                res.status(200).json({status: 'success', data: result})
                return;
            }
            else {
                res.status(400).json({status: 'fail', data: [{en: `You cannot add a rental whose start and end mileage overlaps with an existing rental in the database for that car (you can only add a new rental as a complete first rental, last rental, or to fill a gap in rentals). Current gaps in rentals can be found in the "To be confirmed -> Replenishing rentals" tab.`, pl: `Nie możesz dodać wypożyczenia, którego przebieg początkowy i końcowy nachodzi na istniejące już wypożyczenie w bazie danych dla tego samochodu (możesz jedynie dodać nowe wypożyczenie jako całkowicie pierwsze wypożyczenie, ostatnie lub zapełnić lukę w wypożyczeniach). Aktualne luki w wypożyczeniach znajdziesz w zakładce "Do potwierdzenia -> Uzupełnianie wypożyczeń".`}]});
                return;
            }
        }

        
            
        
    }
    catch (error) {
        res.status(500).json({status: 'error', message: error?.toString()})
    }
    
}


































export const editOneRental_PUT_admin = async (req: Request, res: Response, next: NextFunction) => { 

}































export const deleteOneRental_DELETE_admin = async (req: Request, res: Response, next: NextFunction) => { 

    if (!req.params.rentalid || isNaN(Number(req.params.rentalid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong rental ID.', pl: 'Podano złe ID wypożyczenia.'}]})
        return;
    }



    try {
        const isRentalToDeleteExist = await Rental.fetchOne(Number(req.params.rentalid));
        
        if(!isRentalToDeleteExist) {
            res.status(400).json({status: 'fail', data: [{en: `The rental of id: ${Number(req.params.rentalid)} does not exist in the database.`, pl: `Wypożyczenie o ID: ${Number(req.params.rentalid)} nie istnieje w bazie danych.`}]})
            return;
        }

        const lastRentalOfCar = await Rental.fetchLastRentalOfCar(isRentalToDeleteExist.dataValues.carID);
        if(!lastRentalOfCar) {
            res.status(400).json({status: 'fail', data: [{en: `No last rental found for the car of ID: ${isRentalToDeleteExist.dataValues.carID}.`, pl: `Nie znaleziono ostatniego wypożyczenia dla samochodu o ID: ${isRentalToDeleteExist.dataValues.carID}.`}]})
            return;
        }


        const rentalDeleted = await Rental.deleteRental(Number(req.params.rentalid));
        if(!rentalDeleted) {
            res.status(400).json({status: 'fail', data: [{en: `An error occured. The rental of ID: ${Number(req.params.rentalid)} was not deleted.`, pl: `Wystąpił błąd. Wypożyczenie o ID: ${Number(req.params.rentalid)} nie zostało usunięte.`}]})
            return;
        }



        const isLastRental = lastRentalOfCar.dataValues.id === isRentalToDeleteExist.dataValues.id;
        //if last rental was returned while creating the rental, undo changes
        if(isLastRental) {
            const lastRentalOfCarAfterDelete = await Rental.fetchLastRentalOfCar(isRentalToDeleteExist.dataValues.carID);
            if(lastRentalOfCarAfterDelete && lastRentalOfCarAfterDelete.dataValues.returnUserID === lastRentalOfCar.dataValues.userID && lastRentalOfCarAfterDelete.dataValues.userID !== lastRentalOfCar.dataValues.userID) {
                await Rental.undoReturnRental(lastRentalOfCarAfterDelete.dataValues.id)
                await Car.changeAvailabilityStatus(lastRentalOfCarAfterDelete.dataValues.carID, 'rented');
            }
            else {
                const carData = await Car.fetchOne(isRentalToDeleteExist.dataValues.carID, true);
                if(carData && carData.dataValues.availabilityStatus === 'rented') {
                    await Car.changeAvailabilityStatus(isRentalToDeleteExist.dataValues.carID, 'available');
                }
            }
        }
        


        res.status(200).json({status: 'success', data: rentalDeleted})

    }
    catch(e) {
        res.status(500).json({status: 'error', message: e})
    }

    }