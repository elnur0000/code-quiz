const crypto = require('crypto')
// const ErrorResponse = require('../utils/errorResponse')
const asyncWrapper = require('../utilities/async-wrapper').AsyncWrapper
const { sendEmail } = require('../utilities/mailer')
const { User } = require('../models/user')
const { ResetPasswordRequest } = require('../models/reset-password-request')
const { AuthenticationError, ValidationError, NotFoundError } = require('../errors')
const { resetPasswordTemplate } = require('../utilities/email-templates')

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncWrapper(async (req, res, next) => {
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
exports.login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')

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
exports.getMe = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.send(user)
})

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncWrapper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true
  })

  res.send(user)
})

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')

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
exports.forgotPassword = asyncWrapper(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email
  })

  if (!user) {
    throw new NotFoundError('There is no user with that email')
  }
  if (user.resetRequestLockedUntil > Date.now()) {
    return res.send({ lockedUntil: user.resetRequestLockedUntil })
  }

  if (user.resetAttempts === 3) {
    // current date + 1 hour
    user.resetRequestLockedUntil = Date.now() + 3.6e+6
    user.resetAttempts = 0
  } else {
    // current date + 5 mins
    user.resetRequestLockedUntil = Date.now() + 300000
    user.resetAttempts++
  }
  await user.save()

  const resetPasswordRequest = new ResetPasswordRequest({ user: user._id })
  const resetToken = resetPasswordRequest.initResetToken()
  await resetPasswordRequest.save()

  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`

  try {
    await sendEmail(user.email, 'Forgot your password?', resetPasswordTemplate(resetUrl), 'html')
    // current date + 5 mins
    res.send({ success: true, lockedUntil: user.resetRequestLockedUntil })
  } catch (err) {
    resetPasswordRequest.remove()
    throw new Error('Something wrong with the email service or provided email is incorrect')
  }
})

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncWrapper(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex')

  const resetPasswordRequest = await ResetPasswordRequest.findOne({
    token: resetPasswordToken,
    expiresAt: { $gt: Date.now() }
  })

  if (!resetPasswordRequest) {
    throw new ValidationError('Invalid token')
  }

  const user = await User.findById(resetPasswordRequest.user)
  user.password = req.body.password

  await user.save()
  await resetPasswordRequest.remove()

  res.send()
})
