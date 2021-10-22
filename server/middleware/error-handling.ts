import * as config from '../config'
import {
  Log
} from '../utilities/debug'
import {
  AccessDeniedError,
  AuthenticationError,
  NotFoundError,
  ValidationError
} from '../errors'
import {
  Express,
  ErrorRequestHandler
} from 'express'

const errorLogger: ErrorRequestHandler = (err: Error, req, res, next) => {
  Log.error(err)
  next(err)
}

const authenticationErrorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  if (err instanceof AuthenticationError) {
    return res.status(401).send({ error: { message: err.message } })
  }
  next(err)
}

const notFoundErrorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).send({ error: { message: err.message } })
  }
  next(err)
}

const validationErrorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).send({ error: { message: err.message } })
  }
  next(err)
}

const accessDeniedErrorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  if (err instanceof AccessDeniedError) {
    return res.status(403).send({ error: { message: err.message } })
  }
  next(err)
}
const genericErrorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  res.status(500).send({ error: { message: config.nodeEnv === 'dev' ? err.message || 'Something went wrong with a server' : err.message } })
  next()
}

export default (app: Express): void => {
  app.use([
    errorLogger,
    authenticationErrorHandler,
    validationErrorHandler,
    notFoundErrorHandler,
    accessDeniedErrorHandler,
    genericErrorHandler
  ])
}
