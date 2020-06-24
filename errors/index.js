const ValidationError = require('./validation-error')
const AuthenticationError = require('./authentication-error')
const AccessDeniedError = require('./access-denied-error')
const NotFoundError = require('./not-found-error')

module.exports = {
  AccessDeniedError,
  AuthenticationError,
  ValidationError,
  NotFoundError
}
