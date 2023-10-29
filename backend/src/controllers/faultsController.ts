
import { NextFunction, Request, Response, response } from 'express'

import Fault from '../models/Fault'



export const fetchAllFaults = async (req: Request, res: Response, next: NextFunction) => {
res.json('ok')
}

export const addOneFault = async (req: Request, res: Response, next: NextFunction) => {
    res.json({body: req.body})
    }



