import express, { NextFunction, Request, Response } from 'express'
import { dummyFn } from '../controllers/dummyController';
const app = express.Router();


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    dummyFn(req, res, next);
  })


export default app;