import socketService from './socket'
import * as config from './config'
import express, { Express } from 'express'
import Middleware from './middleware/middleware'
import ErrorHandlingMiddleware from './middleware/error-handling'
import connectDB from './config/db'
import path from 'path'
import auth from './routes/auth'
import test from './routes/test'
import problem from './routes/problem'
import group from './routes/group'
import { shutdown, Log } from './utilities/debug'
import http from 'http'
import socket from 'socket.io'
import mongoose from 'mongoose'

const app = express()
async function bootstrap (app: Express): Promise<void> {
  Middleware(app)

  app.use('/api/v1/auth', auth)
  app.use('/api/v1/problems', problem)
  app.use('/api/v1/groups', group)
  app.use('/api/v1/tests', test)

  app.use(express.static(path.join(__dirname, 'build')))

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  })

  ErrorHandlingMiddleware(app)

  if (process.env.NODE_ENV !== 'test') await connectDB()

  const port = config.port
  app.set('port', port)
  const server = http.createServer(app)

  const io = socket(server)
  app.set('io', io)
  socketService(io)

  server.listen(port)

  server.on('listening', () => Log.info(`🚀  Server is listening on port ${port}`))

  process.on('SIGINT', () => {
    mongoose.disconnect().finally(() => process.exit(0))
  })
}

export default bootstrap(app).catch(err => shutdown(err, 'bootstraping error'))
