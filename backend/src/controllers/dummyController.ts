
import { NextFunction, Request, Response } from 'express'
// import Car from '../models/Car'
const dbModel = require('../database/models/Car')


export const dummyFn = async (req: Request,res: Response,next: NextFunction) => {
    const ress = await dbModel.findAll();
    // console.log(ress[0]);
    res.json({results: ress})
    
}


