const mongoose = require('mongoose')
const crypto = require('crypto')

const ResetPasswordRequestSchema = new mongoose.Schema(
  {
    token: String,
    expiresAt: Date,
    lockedUntil: Date,
    attempts: {
      type: Number,
      default: 0
    },
    user: mongoose.Schema.Types.ObjectId
  }
)

ResetPasswordRequestSchema.methods.initResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')

  this.token = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.expiresAt = Date.now() + 10 * 60 * 1000

  return resetToken
}

module.exports = {
  ResetPasswordRequest: mongoose.model('ResetPasswordRequest', ResetPasswordRequestSchema)
}
