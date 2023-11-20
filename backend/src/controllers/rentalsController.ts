
import { NextFunction, Request, Response, response } from 'express'
import Rental from '../models/Rental';


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
        const test = new Rental(null,1,11,null,data.carMileageBefore,null,null,null,null);
        const x = await test.addOneRental()
        console.log(x);
        res.status(200).json({status: 'success', data: x})
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}