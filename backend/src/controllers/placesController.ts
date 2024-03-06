
import { NextFunction, Request, Response, response } from 'express'

import Place from '../models/Place';
import removeEmptyValuesFromObject from '../utilities/functions/removeEmptyValuesFromObject';
import { filtersObjPlacesSchema } from '../models/validation/PlacesSchemas';






export const fetchAllPlacesWithFilters_GET_user = async (req: Request, res: Response, next: NextFunction) => {
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

    let sortFromOldest = false;
    if(req.query.sortfromoldest && req.query.sortfromoldest === 'true') {sortFromOldest = true}

        try {
            const pageNumber = Number(req.query.pagenumber);
            const pageSize = Number(req.query.pagesize);

            const receivedQueryString = req.query.filters.toString();
            let filtersObj = JSON.parse(receivedQueryString);
            filtersObj = removeEmptyValuesFromObject(filtersObj)
            await filtersObjPlacesSchema.validateAsync(filtersObj)
            const response = await Place.fetchAllPlacesWithFilters(filtersObj, pageSize, pageNumber, sortFromOldest)
            res.status(200).json({status: 'success', data: response.records, pagination: response.pagination})
        }
        catch(e) {
            console.log(e);
            res.status(500).json({status: 'error', message: e})
        }
}