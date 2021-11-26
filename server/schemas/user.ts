import { pre, prop } from '@typegoose/typegoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import * as config from '../config'

@pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return await next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

export class User {
  readonly _id: ObjectId

  @prop({
    required: [true, 'Please add a name'],
    maxlength: 100
  })
  name: string

  @prop({
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  })
  email: string

  @prop({
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  })
  password: string

  @prop()
  resetRequestLockedUntil?: Date

  @prop({
    type: Number,
    default: 0
  })
  resetAttempts: number

  @prop({
    default: Date.now
  })
  createdAt: Date

  getSignedJwtToken (): string {
    return jwt.sign({ id: this._id }, config.authSecret, {
      expiresIn: process.env.JWT_EXPIRE
    })
  }

  async matchPassword (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password)
  }
}
