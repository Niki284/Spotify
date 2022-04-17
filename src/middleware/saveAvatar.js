/**
 * Middleware to save our avatar
 */

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */	
 import sharp from "sharp"
 import { v4 as uuidv4 } from 'uuid';
 import path from 'path';
 import { isPromise } from "util/types";
 import PUBLIC_PATH from "./consts.js";
 export const saveAvatar = async (req,res, next)=> {
     const file = req.file;
     if(!file)return next();
 console.log('t');
     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {	
     const ext = file.originalname.split('.').pop();
         await sharp(file.buffer)
         .resize(128, 128, {
         fit: sharp.fit.cover,
         withoutEnlargement: true,
     })
     
         .toFile(path.join(`${PUBLIC_PATH}/images/avatars/${uuidv4()}.${ext}`));
 }else{
     console.log('erro hem fille ');
 }
 }