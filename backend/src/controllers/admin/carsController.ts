
import { NextFunction, Request, Response, response } from 'express'

import Car from '../../models/Car'
import { addOneCarAdminSchema, editOneCarAdminSchema } from '../../models/validation/CarSchemas';
import Rental from '../../models/Rental';
import Reservation from '../../models/Reservation';
import Refueling from '../../models/Refueling';
import Fault from '../../models/Fault';
import sharp from 'sharp';
import path from 'path';
import removeFile from '../../utilities/fileUpload/removeFile';


export const addOneCar_POST_admin = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const data = req.body;

        if (data.hasFuelCard === 'true' && (data.fuelCardPIN === '' || (data.fuelCardPIN.length !== 4 && data.fuelCardPIN.length !== 6))) {
            res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong fuel card PIN.', pl: 'Podano zły PIN do karty paliwowej.'}]})
            return;
        }


        if(data.fuelCardPIN === '') data.fuelCardPIN = null;
        if(data.availabilityDescription === '') data.availabilityDescription = null;

        const newCar = new Car(null, data.brand, data.model, data.type, 'img', data.plateNumber, data.hasFuelCard, data.fuelCardPIN, data.fuelType, data.tankCapacity, data.loadCapacity, new Date(data.nextInspectionDate), new Date(data.nextInsuranceDate), data.availabilityStatus, data.availabilityDescription);
        await addOneCarAdminSchema.validateAsync(newCar);
        

        if(!req.file) {
            res.status(400).json({status: 'fail', data: [{en: 'An error occurred while uploading the image. The allowed size is 10MB and the format is: .jpg, .jpeg, .png. It is recommended to send the image in 16:9 aspect ratio.', pl: 'Wystąpił błąd podczas wgrywania obrazka. Dopuszczalny rozmiar to 10MB, a format to: .jpg, .jpeg, .png. Zaleca się przesłanie obrazka w proporcjach 16:9.'}]})
            return;
        }
        const fileType = '.' + req.file.mimetype.split('/')[1];
        const currentDate = new Date().getTime();


        const uploadedImage = await sharp(req.file?.buffer)
        .resize(1280, 720, {
            kernel: sharp.kernel.nearest,
            fit: 'cover',
            position: 'centre',
          })
          .toFile(path.join('public', 'uploaded_images', `car-${currentDate}${fileType}`))

          if(!uploadedImage) {
            res.status(400).json({status: 'fail', data: [{en: 'An error occurred while resizing the image and saving it to the server.', pl: 'Wystąpił błąd podczas zmieniania rozmiaru obrazka i zapisywania go na serwerze.'}]})
            return;
          }

        const finalPathName: string = path.join('/', 'uploaded_images', `car-${currentDate}${fileType}`).replace(/\\/g, '/');
          

        newCar.changeImgPath(finalPathName);
        const result = await newCar.addOneCar();


        res.status(200).json({status: 'success', data: result})

    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }
}








export const editOneCar_PUT_admin = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const data = req.body;
        console.log(data.fuelCardPIN.length);
        if (data.hasFuelCard === 'true' && (data.fuelCardPIN === '' || (data.fuelCardPIN.length !== 4 && data.fuelCardPIN.length !== 6))) {
            res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong fuel card PIN.', pl: 'Podano zły PIN do karty paliwowej.'}]})
            return;
        }


        if(data.fuelCardPIN === '') data.fuelCardPIN = null;
        if(data.availabilityDescription === '') data.availabilityDescription = null;

        if (!req.params.carid || isNaN(Number(req.params.carid))) {
            res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
            return;
        }

        const isCarExist = await Car.fetchOne(Number(req.params.carid), true)
        if(!isCarExist) {
            res.status(400).json({status: 'fail', data: [{en: `The car of id: ${Number(req.params.carid)} does not exist in the database.`, pl: `Samochód o ID: ${Number(req.params.carid)} nie istnieje w bazie danych.`}]})
            return;
        }

        if(isCarExist.dataValues.availabilityStatus === 'rented') {
            res.status(400).json({status: 'fail', data: [{en: `You cannot edit a car while it is rented.`, pl: `Nie możesz edytować samochodu, dopóki jest on wypożyczony.`}]})
            return;
        }

        const editedCar = new Car(Number(req.params.carid), data.brand, data.model, data.type, isCarExist.dataValues.imgPath, data.plateNumber, data.hasFuelCard, data.fuelCardPIN, data.fuelType, data.tankCapacity, data.loadCapacity, new Date(data.nextInspectionDate), new Date(data.nextInsuranceDate), data.availabilityStatus, data.availabilityDescription);
        await editOneCarAdminSchema.validateAsync(editedCar);

        if(req.file) {
            const fileType = '.' + req.file.mimetype.split('/')[1];
            const currentDate = new Date().getTime();

            const uploadedImage = await sharp(req.file?.buffer)
            .resize(1280, 720, {
                kernel: sharp.kernel.nearest,
                fit: 'cover',
                position: 'centre',
            })
            .toFile(path.join('public', 'uploaded_images', `car-${currentDate}${fileType}`))

            if(!uploadedImage) {
                res.status(400).json({status: 'fail', data: [{en: 'An error occurred while resizing the image and saving it to the server.', pl: 'Wystąpił błąd podczas zmieniania rozmiaru obrazka i zapisywania go na serwerze.'}]})
                return;
            }

            const finalPathName: string = path.join('/', 'uploaded_images', `car-${currentDate}${fileType}`).replace(/\\/g, '/');
            
            const previousImageRemoved = await removeFile(path.join('./public', isCarExist.dataValues.imgPath))

            editedCar.changeImgPath(finalPathName);
        }

        const result = await editedCar.editOneCar();

        res.status(200).json({status: 'success', data: result});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }
}




export const deleteOneCar_DELETE_admin = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.params.carid || isNaN(Number(req.params.carid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }

    try {
        const isCarExist = await Car.fetchOne(Number(req.params.carid), true)
        if(!isCarExist) {
            res.status(400).json({status: 'fail', data: [{en: `The car of id: ${Number(req.params.carid)} does not exist in the database.`, pl: `Samochód o ID: ${Number(req.params.carid)} nie istnieje w bazie danych.`}]})
            return;
        }

        if(isCarExist.dataValues.availabilityStatus === 'rented') {
            res.status(400).json({status: 'fail', data: [{en: `You cannot delete a car while it is rented.`, pl: `Nie możesz usunąć samochodu, dopóki jest on wypożyczony.`}]})
            return;
        }

        const associatedRentals = await Rental.fetchNumberOfRentalsAssociatedWithCar(Number(req.params.carid));
        const associatedReservations = await Reservation.fetchNumberOfReservationsAssociatedWithCar(Number(req.params.carid));
        const associatedRefuelings = await Refueling.fetchNumberOfRefuelingsAssociatedWithCar(Number(req.params.carid));
        const associatedFaults = await Fault.fetchNumberOfFaultsAssociatedWithCar(Number(req.params.carid));        

        if(associatedRentals > 0 || associatedReservations > 0 || associatedRefuelings > 0 || associatedFaults > 0) {
            res.status(400).json({status: 'fail', data: [{en: `You cannot delete a car while it has an associations to other tables in the database. It is recommended to change the car's status to "Banned", which will allow you to keep statistics about this car. If you still want to completely remove this car from the database, remove all associations first. "Rentals" table: ${associatedRentals}, "Reservations" table: ${associatedReservations}, "Refuelings" table: ${associatedRefuelings}, "Faults" table: ${associatedFaults}.`, pl: `Nie możesz usunąć samochodu, dopóki ma on powiązania z innymi tabelami w bazie danych. Zaleca się zmianę statusu samochodu na "Zbanowany", co pozwoli na zachowanie statystyk na temat tego auta. Jeżeli mimo wszystko chcesz całkowicie usunąć ten samochód z bazy danych, to usuń najpierw wszelkie powiązania. Tabela "Wypożyczenia": ${associatedRentals}, tabela "Rezerwacje": ${associatedReservations}, tabela "Tankowania": ${associatedRefuelings}, tabela "Usterki": ${associatedFaults}.`}]})
            return;
        }

        let imageRemoved = false;
        const dataRemoved = await Car.deleteCar(Number(req.params.carid));
        if(dataRemoved) {
            imageRemoved = await removeFile(path.join('./public', isCarExist.dataValues.imgPath))
        }
        

        res.status(200).json({status: 'success', data: {isDataRemoved: dataRemoved, isImageRemoved: imageRemoved}})

    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }

}
