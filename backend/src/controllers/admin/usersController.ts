import { NextFunction, Request, Response, response } from 'express'
import User from '../../models/User';
import { editOneUserByAdminSchema } from '../../models/validation/UserSchemas';
import Rental from '../../models/Rental';
import Reservation from '../../models/Reservation';
import Refueling from '../../models/Refueling';
import Fault from '../../models/Fault';
import removeFile from '../../utilities/fileUpload/removeFile';
import path from 'path'
















export const editOneUser_PUT_admin = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    if (!req.params.userid || isNaN(Number(req.params.userid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }

    try {
        const isUserExist = await User.fetchOne(Number(req.params.userid), true)
        if(!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${Number(req.params.userid)} does not exist in the database.`, pl: `Użytkownik o ID: ${Number(req.params.userid)} nie istnieje w bazie danych.`}]})
            return;
        }


        const editedUser = new User(Number(req.params.userid), null, null, data.gender, data.name, data.surname, data.employedAs, null, data.role);

        await editOneUserByAdminSchema.validateAsync(editedUser);
        const result = await editedUser.editOneUserAsAdmin();

        res.status(200).json({status: 'success', data: result});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }
}




















export const deleteOneUser_DELETE_admin = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.params.userid || isNaN(Number(req.params.userid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }

    try {
        const isUserExist = await User.fetchOne(Number(req.params.userid), true)
        if(!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${Number(req.params.userid)} does not exist in the database.`, pl: `Użytkownik o ID: ${Number(req.params.userid)} nie istnieje w bazie danych.`}]})
            return;
        }

        const associatedRentals = await Rental.fetchNumberOfRentalsAssociatedWithUser(Number(req.params.userid), false, false);
        const associatedReservations = await Reservation.fetchNumberOfReservationsAssociatedWithUser(Number(req.params.userid), false);
        const associatedRefuelings = await Refueling.fetchNumberOfRefuelingsAssociatedWithUser(Number(req.params.userid), false);
        const associatedFaults = await Fault.fetchNumberOfFaultsAssociatedWithUser(Number(req.params.userid), false);        

        if(associatedRentals > 0 || associatedReservations > 0 || associatedRefuelings > 0 || associatedFaults > 0) {
            res.status(400).json({status: 'fail', data: [{en: `You cannot delete a user while it has an associations to other tables in the database. It is recommended to change the user status to "Banned", which will allow you to keep statistics about this user. If you still want to completely remove this user from the database, remove all associations first. "Rentals" table: ${associatedRentals}, "Reservations" table: ${associatedReservations}, "Refuelings" table: ${associatedRefuelings}, "Faults" table: ${associatedFaults}.`, pl: `Nie możesz usunąć użytkownika, dopóki ma on powiązania z innymi tabelami w bazie danych. Zaleca się zmianę statusu użytkownika na "Zbanowany", co pozwoli na zachowanie statystyk na temat tego użytkownika. Jeżeli mimo wszystko chcesz całkowicie usunąć tego użytkownika z bazy danych, to usuń najpierw wszelkie powiązania. Tabela "Wypożyczenia": ${associatedRentals}, tabela "Rezerwacje": ${associatedReservations}, tabela "Tankowania": ${associatedRefuelings}, tabela "Usterki": ${associatedFaults}.`}]})
            return;
        }


        let imageRemoved = false;
        const dataRemoved = await User.deleteUser(Number(req.params.userid));
        if(dataRemoved && isUserExist.dataValues.avatarPath) {
            imageRemoved = await removeFile(path.join('./public', isUserExist.dataValues.avatarPath))
        }

        res.status(200).json({status: 'success', data: {dataRemoved: dataRemoved, imageRemoved: imageRemoved}})

    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }

}



















export const acknowledgeOneUser_PUT_admin = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    if (!data.userid || isNaN(Number(data.userid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }

    

    try {

        const isUserExist = await User.fetchOne(Number(data.userid), true)
        if(!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${Number(data.userid)} does not exist in the database.`, pl: `Użytkownik o ID: ${Number(data.userid)} nie istnieje w bazie danych.`}]})
            return;
        }

        else {
            if(isUserExist.dataValues.role !== 'unconfirmed') {
                res.status(400).json({status: 'fail', data: [{en: `You cannot confirm a user account with a status other than "Unconfirmed".`, pl: `Nie możesz potwierdzić konta użytkownika, który ma status inny niż "Niepotwierdzony".`}]})
                return;
            }
            const result = await User.acknowledgeUserByModerator(Number(data.userid));
            res.status(200).json({status: 'success', data: result});
        }
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }

}
