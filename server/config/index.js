const dotenv = require('dotenv')
const path = require('path')

function normalizePort (val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

dotenv.config({ path: path.join(__dirname, '..', '.env') })
module.exports = {
  mongoUri: process.env.MONGO_URI,
  port: normalizePort(process.env.PORT || 5000)
}
