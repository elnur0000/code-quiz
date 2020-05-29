const express = require('express')
const Middleware = require('./middleware/middleware')
const ErrorHandlingMiddleware = require('./middleware/error-handling')
const connectDB = require('./config/db')

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

ErrorHandlingMiddleware(app)

module.exports = app
