
import { NextFunction, Request, Response, response } from 'express'

import Place from '../models/Place';




export const fetchAllPlaces_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    let alsoBanned = false;
    if(req.query.showbanned && req.query.showbanned === 'true') {
        alsoBanned = true;
    }
    
    try {
        const data = await Place.fetchAll(alsoBanned);
        res.json({status: 'success', data: data});
    }
    catch(e) {
        res.status(500).json({status: 'error', message: e})
    }
}
