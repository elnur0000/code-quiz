const { ValidationError, AuthenticationError, AccessDeniedError, NotFoundError } = require('../errors')

function errorLogger (err, req, res, next) {
  if (err.message) {
    console.log(err.message)
  }
  if (err.stack) {
    console.log(err.message)
  }
  next(err)
}

function authenticationErrorHandler (err, req, res, next) {
  if (err instanceof AuthenticationError) {
    return res.status(401).send({ error: { message: err.message } })
  }
  next(err)
}

function notFoundErrorHandler (err, req, res, next) {
  if (err instanceof NotFoundError) {
    return res.status(404).send({ error: { message: err.message } })
  }
  next(err)
}

function validationErrorHandler (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(400).send({ error: { message: err.message } })
  }
  next(err)
}

function accessDeniedErrorHandler (err, req, res, next) {
  if (err instanceof AccessDeniedError) {
    return res.status(403).send({ error: { message: err.message } })
  }
  next(err)
}

function genericErrorHandler (err, req, res, next) {
  res.status(500).send()
  next()
}

module.exports = function ErrorHandlingMiddleware (app) {
  app.use([
    errorLogger,
    authenticationErrorHandler,
    validationErrorHandler,
    notFoundErrorHandler,
    accessDeniedErrorHandler,
    genericErrorHandler
  ])
}
