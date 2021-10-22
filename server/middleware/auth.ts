import jwt from 'jsonwebtoken'
import * as config from '../config'
import { AuthenticationError } from '../errors'
import { UserModel } from '../schemas/user'
import {
  JwtUserPayload, RequestUser
} from '../types/index'
import asyncWrapper from '../utilities/async-wrapper'

export const protectedRoute = asyncWrapper(async (req, res, next) => {
  let token: any
  if (
    req.headers.authorization?.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    throw new AuthenticationError()
  }

  const decoded = jwt.verify(token, config.authSecret) as JwtUserPayload
  const user = await UserModel.findById(decoded.id).exec()
  if (!user) {
    throw new AuthenticationError()
  }
  req.user = user.toObject() as RequestUser
  next()
})
