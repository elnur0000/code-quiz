const express = require('express')
const Middleware = require('./middleware/middleware')
const ErrorHandlingMiddleware = require('./middleware/error-handling')
const connectDB = require('./config/db')
const path = require('path')

// Connect to database if it's not a test environment
if (process.env.NODE_ENV !== 'test') connectDB()

const app = express()

// routes
const auth = require('./routes/auth')
const test = require('./routes/test')
const problem = require('./routes/problem')
const group = require('./routes/group')

Middleware(app)

app.use('/api/v1/auth', auth)
app.use('/api/v1/problems', problem)
app.use('/api/v1/groups', group)
app.use('/api/v1/tests', test)

app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

ErrorHandlingMiddleware(app)

module.exports = app
