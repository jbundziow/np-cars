
import { NextFunction, Request, Response, response } from 'express'


// id: this.id,
// carID: this.carID,
// userID: this.userID,
// lastEditedByModeratorOfID: this.lastEditedByModeratorOfID,
// carMileageBefore: this.carMileageBefore,
// carMileageAfter: this.carMileageAfter,
// travelDestination: this.travelDestination,
// placeID: this.placeID,
// dateTo: this.dateTo,


export const addOneRental = async (req: Request, res: Response, next: NextFunction) => {
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

    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}