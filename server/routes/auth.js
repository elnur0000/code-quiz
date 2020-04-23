const express = require('express')
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword
} = require('../controllers/auth-controller')
const { protectedRoute } = require('../middleware/auth')
const { validator } = require('../middleware/validator')

const router = express.Router()

router.post('/register', validator('User'), register)
router.get('/register', validator('User'), register)
router.post('/login', validator('User', 'login'), login)
router.post('/forgotpassword', validator('User', 'forgotPassword'), forgotPassword)
router.put('/resetpassword/:resettoken', validator('User', 'resetPassword'), resetPassword)

// private routes
router.use(protectedRoute)
router.get('/me', getMe)
router.put('/updatedetails', validator('User', 'updateDetails'), updateDetails)
router.put('/updatepassword', validator('User', 'updatePassword'), updatePassword)

module.exports = router
