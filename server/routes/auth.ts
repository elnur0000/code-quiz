import {
  userValidationSchemas
} from '../validation-schemas'
import express from 'express'
import { register, login, getMe, forgotPassword, resetPassword, updateDetails, updatePassword } from '../domains/auth/controller'
import { protectedRoute } from '../middleware/auth'
import validator from '../middleware/validator'

const router = express.Router()

router.post('/register', validator(userValidationSchemas.register), register)
router.post('/login', validator(userValidationSchemas.login), login)
router.post('/forgotpassword', validator(userValidationSchemas.forgotPassword), forgotPassword)
router.put('/resetpassword/:resetToken', validator(userValidationSchemas.resetPassword), resetPassword)

// private routes
router.use(protectedRoute)
router.get('/me', getMe)
router.put('/updatedetails', validator(userValidationSchemas.updateUser), updateDetails)
router.put('/updatepassword', validator(userValidationSchemas.updatePassword), updatePassword)

export default router
