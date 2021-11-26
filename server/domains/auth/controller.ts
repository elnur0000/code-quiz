import {
  ForgotPasswordBodyDto,
  LoginBodyDto,
  RegisterBodyDto,
  ResetPasswordBodyDto,
  ResetPasswordParamsDto,
  UpdatePasswordBodyDto,
  UpdateUserBodyDto
} from './dto'
import { Request } from 'express'
import crypto from 'crypto'
// const ErrorResponse = require('../utils/errorResponse')
import asyncWrapper from '../../utilities/async-wrapper'
import { sendEmail } from '../../utilities/mailer'
import {
  UserModel,
  ResetPasswordRequestModel
} from '../../schemas'
import { AuthenticationError, BadRequestError, NotFoundError } from '../../errors'
import { resetPasswordTemplate } from '../../utilities/email-templates'

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
export const register = asyncWrapper(async (req: Request<{}, {}, RegisterBodyDto>, res, next) => {
  if (await UserModel.exists({ email: req.body.email })) {
    throw new BadRequestError('There is already an account with that email')
  }
  const user = await UserModel.create(req.body)
  const token = user.getSignedJwtToken()
  res.send({ token })
})

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
export const login = asyncWrapper(async (req: Request<{}, {}, LoginBodyDto>, res, next) => {
  const { email, password } = req.body

  const user = await UserModel.findOne({ email }).select('+password').exec()

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
export const getMe = asyncWrapper(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).exec()

  res.send(user)
})

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
export const updateDetails = asyncWrapper(async (req: Request<{}, {}, UpdateUserBodyDto>, res, next) => {
  const user = await UserModel.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true
  }).exec()

  res.send(user)
})

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
export const updatePassword = asyncWrapper(async (req: Request<{}, {}, UpdatePasswordBodyDto>, res, next) => {
  const user = await UserModel.findById(req.user._id).select('+password').exec()

  if (!user) {
    throw new NotFoundError('User not found')
  }
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
export const forgotPassword = asyncWrapper(async (req: Request<{}, {}, ForgotPasswordBodyDto>, res, next) => {
  const user = await UserModel.findOne({
    email: req.body.email
  }).exec()

  if (!user) {
    throw new NotFoundError('There is no user with that email')
  }
  if (user.resetRequestLockedUntil && (user.resetRequestLockedUntil > new Date())) {
    res.send({ lockedUntil: user.resetRequestLockedUntil })
    return
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

  const resetPasswordRequest = ResetPasswordRequestModel.build(user._id)
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
export const resetPassword = asyncWrapper(async (req: Request<ResetPasswordParamsDto, {}, ResetPasswordBodyDto>, res, next) => {
  if (!req.params.resetToken) {
    throw new BadRequestError('Reset token is required')
  }
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex')
  const resetPasswordRequest = await ResetPasswordRequestModel.findOne({
    token: resetPasswordToken,
    expiresAt: { $gt: new Date() }
  }).exec()

  if (!resetPasswordRequest) {
    throw new BadRequestError('Invalid token')
  }

  const user = await UserModel.findById(resetPasswordRequest.user).exec()
  if (user) {
    user.password = req.body.password

    await user.save()
    await resetPasswordRequest.remove()
  }

  res.send()
})
