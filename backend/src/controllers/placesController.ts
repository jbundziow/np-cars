
import { NextFunction, Request, Response, response } from 'express'

import Place from '../models/Place';
import removeEmptyValuesFromObject from '../utilities/functions/removeEmptyValuesFromObject';
import { filtersObjPlacesSchema } from '../models/validation/PlacesSchemas';
















export const fetchAllPlacesWithFilters_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const validSortOptions = ['createdAt', 'updatedAt', 'status', 'projectCode', 'placeName', 'projectName', 'id']
    if(!req.query.filters) {
        res.status(400).json({status: 'fail', data: [{en: `No query param 'filters' passed.`, pl: `Nie przekazano 'filters' w parametrach zapytania.`}]})
        return;
    }
    if(!req.query.pagenumber || isNaN(Number(req.query.pagenumber))) {
        res.status(400).json({status: 'fail', data: [{en: `No query param 'pagenumber' passed or it is not a number.`, pl: `Nie przekazano 'pagenumber' w parametrach zapytania lub nie jest to cyfra.`}]})
        return;
    }
    if(!req.query.pagesize || isNaN(Number(req.query.pagesize))) {
        res.status(400).json({status: 'fail', data: [{en: `No query param 'pagesize' passed or it is not a number.`, pl: `Nie przekazano 'pagesize' w parametrach zapytania lub nie jest to cyfra.`}]})
        return;
    }
    if(!req.query.sortby || !validSortOptions.includes(req.query.sortby.toString())) {
        res.status(400).json({status: 'fail', data: [{en: `No query param 'sortby' passed or passed a wrong value. Available options: ${validSortOptions.map(option => ` "${option}"`)}.`, pl: `Nie przekazano 'sortby' w parametrach zapytania lub przekazano nieprawidłową wartość. Dostępne opcje to: ${validSortOptions.map(option => ` "${option}"`)}.`}]})
        return;
    }
    if(!req.query.sortorder || (req.query.sortorder !== 'ASC' && req.query.sortorder !== 'DESC')) {
        res.status(400).json({status: 'fail', data: [{en: `No query param 'sortorder' passed. It should be 'ASC' or 'DESC'.`, pl: `Nie przekazano 'sortorder' w parametrach zapytania. Powinno to być 'ASC' lub 'DESC'.`}]})
        return;
    }



        try {
            const pageNumber = Number(req.query.pagenumber);
            const pageSize = Number(req.query.pagesize);

            const receivedQueryString = req.query.filters.toString();
            let filtersObj = JSON.parse(receivedQueryString);
            filtersObj = removeEmptyValuesFromObject(filtersObj)
            await filtersObjPlacesSchema.validateAsync(filtersObj)
            const response = await Place.fetchAllPlacesWithFilters(filtersObj, pageSize, pageNumber, req.query.sortby.toString(), req.query.sortorder)
            res.status(200).json({status: 'success', data: response.records, pagination: response.pagination})
        }
        catch(e) {
            console.log(e);
            res.status(500).json({status: 'error', message: e})
        }
}



















export const fetchOnePlace_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const placeID = req.params.placeid;
    if (!placeID || isNaN(Number(placeID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong place ID.', pl: 'Podano złe ID projektu.'}]})
        return;
    }

    const place = await Place.fetchOne(Number(placeID), true); //show also banned places
    if(place) {
        res.status(200).json({status: 'success', data: place})
    }
    else {
        res.status(400).json({status: 'fail', data: [{en: `Place of ID: ${Number(req.params.placeid)} is not found in the database.`, pl: `Projekt o ID: ${Number(req.params.placeid)} nie został znaleziony w bazie danych.`}]})
        return;
    }
}