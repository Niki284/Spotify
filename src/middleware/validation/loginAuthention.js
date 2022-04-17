
import { body } from "express-validator";

export default [
    body('nickname')
    .notEmpty()
    .withMessage('nickname is verplischt veld')
    .isAlpha()
    .bail(),
    body('nickname')
    .isLength({min:6 , max: 36})
    .withMessage('nickname is niet goed'),
    body('password')
    .isLength({min: 6})
    .withMessage('wachtword is 6 karakters'),
]