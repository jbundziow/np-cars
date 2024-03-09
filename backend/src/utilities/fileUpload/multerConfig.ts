import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

// type DestinationCallback = (error: Error | null, destination: string) => void;
// type FileNameCallback = (error: Error | null, filename: string) => void;
// const storage = multer.diskStorage({
//     destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
//         cb(null, path.join('public', 'uploaded_images'))
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
//     }
// });
const storage = multer.memoryStorage() //store in memory before save, beacuse we need to resize it before save using 'sharp' library



const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const limits = { fileSize: 10 * 1024 * 1024 }; // 10MB

export { storage, fileFilter, limits };
