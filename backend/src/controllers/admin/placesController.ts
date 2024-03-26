import { NextFunction, Request, Response, response } from 'express'
import Place from '../../models/Place';
import { AddOnePlaceByAdminSchema, EditOnePlaceByAdminSchema } from '../../models/validation/PlacesSchemas';
import Rental from '../../models/Rental';





















export const addOnePlace_POST_admin = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    try {
        const newPlace = new Place(null, data.projectCode, data.placeName, data.projectName, 'active');
        await AddOnePlaceByAdminSchema.validateAsync(newPlace);

        const result = await newPlace.addOnePlace();
        res.status(200).json({status: 'success', data: result})

    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }

}




















export const editOnePlace_PUT_admin = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    if (!req.params.placeid || isNaN(Number(req.params.placeid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong place ID.', pl: 'Podano złe ID projektu.'}]})
        return;
    }

    try {
        const isPlaceExist = await Place.fetchOne(Number(req.params.placeid), true)
        if(!isPlaceExist) {
            res.status(400).json({status: 'fail', data: [{en: `The place of id: ${Number(req.params.placeid)} does not exist in the database.`, pl: `Projekt o ID: ${Number(req.params.placeid)} nie istnieje w bazie danych.`}]})
            return;
        }


        const editedPlace = new Place(Number(req.params.placeid), data.projectCode, data.placeName, data.projectName, data.status);
        await EditOnePlaceByAdminSchema.validateAsync(editedPlace);

        const result = await editedPlace.updateOnePlace();
        res.status(200).json({status: 'success', data: result})

    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }

}




















export const deleteOnePlace_PUT_admin = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.params.placeid || isNaN(Number(req.params.placeid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong place ID.', pl: 'Podano złe ID projektu.'}]})
        return;
    }

    try {
        const isPlaceExist = await Place.fetchOne(Number(req.params.placeid), true)
        if(!isPlaceExist) {
            res.status(400).json({status: 'fail', data: [{en: `The place of id: ${Number(req.params.placeid)} does not exist in the database.`, pl: `Projekt o ID: ${Number(req.params.placeid)} nie istnieje w bazie danych.`}]})
            return;
        }


        const associatedRentals = await Rental.fetchNumberOfRentalsAssociatedWithPlace(Number(req.params.placeid));
        if(associatedRentals > 0) {
            res.status(400).json({status: 'fail', data: [{en: `You cannot delete a project that is still associated with the Rentals table. ${associatedRentals} associations found. It is recommended to change the project status to "Inactive" or "Banned". If you want to remove it completely anyway, remove all associations first.`, pl: `Nie możesz usunąć projektu, który jest nadal powiązany z tabelą Wypożyczeń. Znaleziono ${associatedRentals} powiązań. Zaleca się, aby zmienić status projektu na "Nieaktywny" lub "Zbanowany". Jeśli chcesz mimo wszystko usunąć go całkowicie, to usuń najpierw wszelkie powiązania.`}]})
            return;
        }

        const result = await Place.deletePlace(Number(req.params.placeid));
        res.status(200).json({status: 'success', data: result})

    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }

}