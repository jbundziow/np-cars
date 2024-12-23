
import { NextFunction, Request, Response } from 'express'

import User from '../models/User';
import identifyUserId from '../utilities/functions/JWT/identifyUserId';
import { editOneUserByNormalUserSchema } from '../models/validation/UserSchemas';
import sharp from 'sharp';
import path from 'path';
import removeFile from '../utilities/fileUpload/removeFile';



















export const fetchAllUsers_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    let alsoBanned = false;
    if(req.query.showbanned && req.query.showbanned === 'true') {
        alsoBanned = true;
    }

    try {
        const data = await User.fetchAll(alsoBanned);
        res.json({status: 'success', data: data});
    }
    catch(e) {
        res.status(500).json({status: 'error', message: e})
    }
}

export const fetchOneUser_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    let alsoBanned = false;
    if(req.query.showbanned && req.query.showbanned === 'true') {
        alsoBanned = true;
    }

    if (!isNaN(Number(req.params.userid))) {
        try {
            const data = await User.fetchOne(Number(req.params.userid), alsoBanned);
            res.status(200).json({status: 'success', data: data})
        }
        catch(err) {
            res.status(500).json({status: 'error', message: err})
        }
    }
    else {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
    }   

}



















export const editOneUser_PUT_user = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    if (!req.params.userid || isNaN(Number(req.params.userid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }

    try {
        const isUserExist = await User.fetchOne(Number(req.params.userid), true)
        if(!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${Number(req.params.userid)} does not exist in the database.`, pl: `Użytkownik o ID: ${Number(req.params.userid)} nie istnieje w bazie danych.`}]})
            return;
        }

        const {id: userID} = await identifyUserId(req.cookies.jwt);
        if(userID !== Number(req.params.userid)) {
            res.status(400).json({status: 'fail', data: [{en: `You cannot edit other user's data when you are not administrator.`, pl: `Nie możesz edytować danych innego użytkownika nie będąc administratorem.`}]})
            return;
        }


        const editedUser = new User(userID, null, null, data.gender, data.name, data.surname, data.employedAs, null, null);

        await editOneUserByNormalUserSchema.validateAsync(editedUser);
        const result = await editedUser.editOneUserAsUser();

        res.status(200).json({status: 'success', data: result});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }
}




















export const changeUserAvatar_PUT_user = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.params.userid || isNaN(Number(req.params.userid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }

    try {
        const isUserExist = await User.fetchOne(Number(req.params.userid), true)
        if(!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${Number(req.params.userid)} does not exist in the database.`, pl: `Użytkownik o ID: ${Number(req.params.userid)} nie istnieje w bazie danych.`}]})
            return;
        }

        const {id: userID, role: userRole} = await identifyUserId(req.cookies.jwt);
        if((userID !== Number(req.params.userid)) && userRole !== 'admin') {
            res.status(400).json({status: 'fail', data: [{en: `You cannot edit other user's avatar when you are not administrator.`, pl: `Nie możesz zmieniać avataru innego użytkownika nie będąc administratorem.`}]})
            return;
        }

        if (Number(req.params.userid) === 9999 && userID !== 9999) {
            res.status(400).json({status: 'fail', data: [{en: 'You are not allowed to edit photo of Super Admin account.', pl: 'Nie możesz edytować zdjęcia konta Super Admin.'}]})
            return;
        }



        if(!req.file) {
            res.status(400).json({status: 'fail', data: [{en: 'An error occurred while uploading the image. The allowed size is 10MB and the format is: .jpg, .jpeg, .png. It is recommended to send the image in 1:1 aspect ratio.', pl: 'Wystąpił błąd podczas wgrywania obrazka. Dopuszczalny rozmiar to 10MB, a format to: .jpg, .jpeg, .png. Zaleca się przesłanie obrazka w proporcjach 1:1.'}]})
            return;
        }

        const fileType = '.' + req.file.mimetype.split('/')[1];
        const currentDate = new Date().getTime();

        const uploadedImage = await sharp(req.file?.buffer)
        .resize(512, 512, {
            kernel: sharp.kernel.nearest,
            fit: 'cover',
            position: 'centre',
          })
          .toFile(path.join('public', 'uploaded_images', `user-${currentDate}${fileType}`))

          if(!uploadedImage) {
            res.status(400).json({status: 'fail', data: [{en: 'An error occurred while resizing the image and saving it to the server.', pl: 'Wystąpił błąd podczas zmieniania rozmiaru obrazka i zapisywania go na serwerze.'}]})
            return;
          }

        const finalPathName: string = path.join('/', 'uploaded_images', `user-${currentDate}${fileType}`).replace(/\\/g, '/');
          
        let previousImageRemoved = false;
        if(isUserExist.dataValues.avatarPath) {
        previousImageRemoved = await removeFile(path.join('./public', isUserExist.dataValues.imgPath))
        }

        const result = await User.changeAvatarPath(Number(req.params.userid), finalPathName);
        
        res.status(200).json({status: 'success', data: {imageUploadResult: result, previousImageRemoved: previousImageRemoved}});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }
}























export const deleteUserAvatar_DELETE_user = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.userid || isNaN(Number(req.params.userid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }

    try {
        const isUserExist = await User.fetchOne(Number(req.params.userid), true)
        if(!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${Number(req.params.userid)} does not exist in the database.`, pl: `Użytkownik o ID: ${Number(req.params.userid)} nie istnieje w bazie danych.`}]})
            return;
        }

        const {id: userID, role: userRole} = await identifyUserId(req.cookies.jwt);
        if((userID !== Number(req.params.userid)) && userRole !== 'admin') {
            res.status(400).json({status: 'fail', data: [{en: `You cannot delete other user's avatar when you are not administrator.`, pl: `Nie możesz usunąć avataru innego użytkownika nie będąc administratorem.`}]})
            return;
        }

        if (Number(req.params.userid) === 9999 && userID !== 9999) {
            res.status(400).json({status: 'fail', data: [{en: 'You are not allowed to delete photo of Super Admin account.', pl: 'Nie możesz usunąć zdjęcia konta Super Admin.'}]})
            return;
        }


        if(!isUserExist.dataValues.avatarPath) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${Number(req.params.userid)} does not have an avatar.`, pl: `Użytkownik o ID: ${Number(req.params.userid)} nie ma avataru.`}]})
            return;
        }
        
        const imageRemoved = await removeFile(path.join('./public', isUserExist.dataValues.avatarPath))
        if(imageRemoved) {
            const result = await User.changeAvatarPath(Number(req.params.userid), null);
            res.status(200).json({status: 'success', data: result});
        }
        else {
            res.status(400).json({status: 'fail', data: [{en: 'An error occurred while removing the image from the server.', pl: 'Wystąpił błąd podczas usuwania obrazka z serwera.'}]})
        }
        

    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }
}