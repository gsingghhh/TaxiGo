import { Router } from "express";
import { body } from 'express-validator'
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be >= 6 characters')
],
registerUser)


export default router