
import { NextFunction, Request, Response, response } from 'express'

import Place from '../models/Place';




export const fetchAllPlaces_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Place.fetchAll();
        res.json({status: 'success', data: data});
    }
    catch(e) {
        res.status(500).json({status: 'error', message: e})
    }
}
