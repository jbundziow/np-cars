import { NextFunction, Request, Response } from 'express'

export const fetchTotalTravelledDistanceByUser_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    if(!query.userid || isNaN(Number(query.userid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }
    if(!query.year || isNaN(Number(query.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year.', pl: 'Podano zły rok.'}]})
        return;
    }

    switch (Number(query.year)) {
        case 2024:
            res.status(200).json({status: 'success', data: {
                  userid: Number(query.userid),
                  year: Number(query.year),
                  key: Math.random(),
                  distance: [
                    {month_num: 0, month_text: 'January', total_dist: Math.floor(Math.random() * 101)},
                    {month_num: 1, month_text: 'February', total_dist: 242},
                    {month_num: 2, month_text: 'March', total_dist: 165},
                    {month_num: 3, month_text: 'April', total_dist: 362},
                    {month_num: 4, month_text: 'May', total_dist: 212},
                    {month_num: 5, month_text: 'June', total_dist: 123},
                    {month_num: 6, month_text: 'July', total_dist: 143},
                    {month_num: 7, month_text: 'August', total_dist: 752},
                    {month_num: 8, month_text: 'September', total_dist: 532},
                    {month_num: 9, month_text: 'October', total_dist: 234},
                    {month_num: 10, month_text: 'November', total_dist: 100},
                    {month_num: 11, month_text: 'December', total_dist: 494}
                  ]
            }})
            break;

        case 2023:
        res.status(200).json({status: 'success', data: {
                userid: Number(query.userid),
                year: Number(query.year),
                key: Math.random(),
                distance: [
                {month_num: 0, month_text: 'January', total_dist: 100},
                {month_num: 1, month_text: 'February', total_dist: 342},
                {month_num: 2, month_text: 'March', total_dist: 266},
                {month_num: 3, month_text: 'April', total_dist: 262},
                {month_num: 4, month_text: 'May', total_dist: 112},
                {month_num: 5, month_text: 'June', total_dist: 233},
                {month_num: 6, month_text: 'July', total_dist: 143},
                {month_num: 7, month_text: 'August', total_dist: 232},
                {month_num: 8, month_text: 'September', total_dist: 1042},
                {month_num: 9, month_text: 'October', total_dist: 2037},
                {month_num: 10, month_text: 'November', total_dist: 194},
                {month_num: 11, month_text: 'December', total_dist: 44}
                ]
        }})
        break;

        case 2022:
        res.status(200).json({status: 'success', data: {
                userid: Number(query.userid),
                year: Number(query.year),
                key: Math.random(),
                distance: [
                {month_num: 0, month_text: 'January', total_dist: 42},
                {month_num: 1, month_text: 'February', total_dist: 432},
                {month_num: 2, month_text: 'March', total_dist: 2566},
                {month_num: 3, month_text: 'April', total_dist: 424},
                {month_num: 4, month_text: 'May', total_dist: 241},
                {month_num: 5, month_text: 'June', total_dist: 743},
                {month_num: 6, month_text: 'July', total_dist: 1345},
                {month_num: 7, month_text: 'August', total_dist: 3552},
                {month_num: 8, month_text: 'September', total_dist: 124},
                {month_num: 9, month_text: 'October', total_dist: 2331},
                {month_num: 10, month_text: 'November', total_dist: 932},
                {month_num: 11, month_text: 'December', total_dist: 542}
                ]
        }})
        break;
    
        default:
            res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year!', pl: 'Podano zły rok!'}]})
            return;
            break;
    }
}