const mongoose = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false
    },
    resetRequestLockedUntil: Date,
    resetAttempts: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
)

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

module.exports = {
  User: mongoose.model('User', UserSchema),
  UserValidationSchema: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
  UserLoginValidationSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
  UserForgotPasswordValidationSchema: Joi.object().keys({
    email: Joi.string().email().required()
  }),
  UserResetPasswordValidationSchema: Joi.object().keys({
    password: Joi.string().min(6).required()
  }),
  UserUpdateDetailsValidationSchema: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required()
  }),
  UserUpdatePasswordValidationSchema: Joi.object().keys({
    newPassword: Joi.string().min(6).required()
  })
}
