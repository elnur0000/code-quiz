import { DocumentType, prop, Ref, ReturnModelType } from '@typegoose/typegoose'
import * as schemas from './index'
import crypto from 'crypto'
import { ObjectId } from 'mongodb'
import { User } from './user'

export class ResetPasswordRequest {
  readonly _id: ObjectId

  @prop({
    required: true
  })
  token: string

  @prop({
    required: true
  })
  expiresAt: Date

  @prop({
    default: 0
  })
  attempts: number

  @prop()
  lockedUntil?: Date

  @prop({
    ref: () => User
  })
  user: Ref<User>

  @prop({
    expires: '1d',
    default: Date.now()
  })
  createdAt: Date

  static build (this: ReturnModelType<typeof ResetPasswordRequest>, userId: ObjectId): DocumentType<ResetPasswordRequest> {
    const resetToken = crypto.randomBytes(20).toString('hex')
    const token = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    const resetPasswordRequest = {
      token,
      expiresAt,
      user: userId,
      attempts: 0,
      createdAt: new Date()
    }
    return new schemas.ResetPasswordRequestModel(resetPasswordRequest)
  }
}
