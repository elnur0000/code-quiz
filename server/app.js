const express = require('express')
const Middleware = require('./middleware/middleware')
const ErrorHandlingMiddleware = require('./middleware/error-handling')
const connectDB = require('./config/db')

// const { python, cpp, java, c, node } = require('compile-run')
// const sourcecode = `
// public class HelloWorld{

//  public static void main(String []args){
//     System.out.println("Hello World");
//  }
// }
// `
// const resultPromise = java.runSource(sourcecode)
// resultPromise
//   .then(result => {
//     console.log(result, 'done')
//   })
//   .catch(err => {
//     console.log(err)
//   })

// Connect to database if it's not a test environment
if (process.env.NODE_ENV !== 'test') connectDB()

const app = express()

// routes
const auth = require('./routes/auth')

Middleware(app)

app.use('/api/v1/auth', auth)

ErrorHandlingMiddleware(app)

module.exports = app
