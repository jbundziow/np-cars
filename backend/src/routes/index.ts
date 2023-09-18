import express, { NextFunction, Request, Response } from 'express'
import { dummyFn } from '../controllers/dummyController';
const app = express.Router();

app.get('/', dummyFn)

export default app;