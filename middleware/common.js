const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

module.exports = function CommonMiddleware (app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(morgan('common'))
  app.use(cors())
  app.use(helmet())
}
