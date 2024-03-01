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
                    {month_num: 0, month_text: 'January', total_distance: Math.floor(Math.random() * 101)},
                    {month_num: 1, month_text: 'February', total_distance: 242},
                    {month_num: 2, month_text: 'March', total_distance: 165},
                    {month_num: 3, month_text: 'April', total_distance: 362},
                    {month_num: 4, month_text: 'May', total_distance: 212},
                    {month_num: 5, month_text: 'June', total_distance: 123},
                    {month_num: 6, month_text: 'July', total_distance: 143},
                    {month_num: 7, month_text: 'August', total_distance: 752},
                    {month_num: 8, month_text: 'September', total_distance: 532},
                    {month_num: 9, month_text: 'October', total_distance: 234},
                    {month_num: 10, month_text: 'November', total_distance: 100},
                    {month_num: 11, month_text: 'December', total_distance: 494}
                  ]
            }})
            break;

        case 2023:
        res.status(200).json({status: 'success', data: {
                userid: Number(query.userid),
                year: Number(query.year),
                key: Math.random(),
                distance: [
                {month_num: 0, month_text: 'January', total_distance: 100},
                {month_num: 1, month_text: 'February', total_distance: 342},
                {month_num: 2, month_text: 'March', total_distance: 266},
                {month_num: 3, month_text: 'April', total_distance: 262},
                {month_num: 4, month_text: 'May', total_distance: 112},
                {month_num: 5, month_text: 'June', total_distance: 233},
                {month_num: 6, month_text: 'July', total_distance: 143},
                {month_num: 7, month_text: 'August', total_distance: 232},
                {month_num: 8, month_text: 'September', total_distance: 1042},
                {month_num: 9, month_text: 'October', total_distance: 2037},
                {month_num: 10, month_text: 'November', total_distance: 194},
                {month_num: 11, month_text: 'December', total_distance: 44}
                ]
        }})
        break;

        case 2022:
        res.status(200).json({status: 'success', data: {
                userid: Number(query.userid),
                year: Number(query.year),
                key: Math.random(),
                distance: [
                {month_num: 0, month_text: 'January', total_distance: 42},
                {month_num: 1, month_text: 'February', total_distance: 432},
                {month_num: 2, month_text: 'March', total_distance: 2566},
                {month_num: 3, month_text: 'April', total_distance: 424},
                {month_num: 4, month_text: 'May', total_distance: 241},
                {month_num: 5, month_text: 'June', total_distance: 743},
                {month_num: 6, month_text: 'July', total_distance: 1345},
                {month_num: 7, month_text: 'August', total_distance: 3552},
                {month_num: 8, month_text: 'September', total_distance: 124},
                {month_num: 9, month_text: 'October', total_distance: 2331},
                {month_num: 10, month_text: 'November', total_distance: 932},
                {month_num: 11, month_text: 'December', total_distance: 542}
                ]
        }})
        break;
    
        default:
            res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year!', pl: 'Podano zły rok!'}]})
            return;
            break;
    }
}


