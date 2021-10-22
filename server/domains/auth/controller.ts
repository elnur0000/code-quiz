import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  UpdatePasswordDto,
  UpdateUserDto
} from './dto'
import {
  IRequest
} from '../../types/index'
import crypto from 'crypto'
// const ErrorResponse = require('../utils/errorResponse')
import asyncWrapper from '../../utilities/async-wrapper'
import { sendEmail } from '../../utilities/mailer'
import User from '../../schemas/user'
import ResetPasswordRequest from '../../schemas/reset-password-request'
import { AuthenticationError, ValidationError, NotFoundError } from '../../errors'
import { resetPasswordTemplate } from '../../utilities/email-templates'

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
export const register = asyncWrapper(async (req: IRequest<RegisterDto>, res, next) => {
  if (await User.exists({ email: req.body.email })) {
    throw new ValidationError('There is already an account with that email')
  }
  const user = await User.create(req.body)
  const token = user.getSignedJwtToken()
  res.send({ token })
})

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
export const login = asyncWrapper(async (req: IRequest<LoginDto>, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password').exec()

  if (!user) {
    throw new AuthenticationError('Invalid credentials')
  }

  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    throw new AuthenticationError('Invalid credentials')
  }

  const token = user.getSignedJwtToken()
  res.send({ token })
})

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
export const getMe = asyncWrapper(async (req: IRequest, res, next) => {
  const user = await User.findById(req.user._id).exec()

  res.send(user)
})

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
export const updateDetails = asyncWrapper(async (req: IRequest<UpdateUserDto>, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true
  }).exec()

  res.send(user)
})

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
export const updatePassword = asyncWrapper(async (req: IRequest<UpdatePasswordDto>, res, next) => {
  const user = await User.findById(req.user._id).select('+password').exec()

  if (!(await user.matchPassword(req.body.currentPassword))) {
    throw new AuthenticationError('Password is incorrect')
  }

  user.password = req.body.newPassword
  await user.save()

  const token = user.getSignedJwtToken()
  res.send({ token })
})

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
export const forgotPassword = asyncWrapper(async (req: IRequest<ForgotPasswordDto>, res, next) => {
  const user = await User.findOne({
    email: req.body.email
  }).exec()

  if (!user) {
    throw new NotFoundError('There is no user with that email')
  }
  if (user.resetRequestLockedUntil > new Date()) {
    return res.send({ lockedUntil: user.resetRequestLockedUntil })
  }

  if (user.resetAttempts === 3) {
    // current date + 1 hour
    user.resetRequestLockedUntil = new Date(Date.now() + 3.6e+6)
    user.resetAttempts = 0
  } else {
    // current date + 5 mins
    user.resetRequestLockedUntil = new Date(Date.now() + 300000)
    user.resetAttempts++
  }
  await user.save()

  const resetPasswordRequest = ResetPasswordRequest.build(user._id)
  await resetPasswordRequest.save()

  const resetToken = resetPasswordRequest.token

  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`

  try {
    await sendEmail({
      to: user.email,
      subject: 'Forgot your password?',
      html: resetPasswordTemplate(resetUrl)
    })
    // current date + 5 mins
    res.send({ success: true, lockedUntil: user.resetRequestLockedUntil })
  } catch (err) {
    await resetPasswordRequest.remove()
    throw new Error('Something wrong with the email service or provided email is incorrect')
  }
})

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
export const resetPassword = asyncWrapper(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex')

  const resetPasswordRequest = await ResetPasswordRequest.findOne({
    token: resetPasswordToken,
    expiresAt: { $gt: new Date() }
  }).exec()

  if (!resetPasswordRequest) {
    throw new ValidationError('Invalid token')
  }

  const user = await User.findById(resetPasswordRequest.user).exec()
  user.password = req.body.password

  await user.save()
  await resetPasswordRequest.remove()

  res.send()
})
