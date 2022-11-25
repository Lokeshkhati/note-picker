import express from 'express';
const router = express.Router()

import { register, login, logout, forgotPassword, resetPassword, getLoggedInUserDetails, } from '../controllers/userController.js'
import { isLoggedIn } from '../middlewares/user.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:id').put(resetPassword)
router.route('/profile').get(isLoggedIn, getLoggedInUserDetails)

export default router