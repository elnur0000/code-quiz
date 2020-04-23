const AccessDeniedError = require('../errors/access-denied-error')
module.exports = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AccessDeniedError("Your role doesn't have access to this route")
    }
    next()
  }
}
