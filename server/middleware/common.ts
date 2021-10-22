import * as config from '../config'
import morgan from 'morgan'
import cors from 'cors'
import express, { Express } from 'express'
// @ts-expect-error
import helmet from 'helmet'

export default function CommonMiddleware (app: Express): void {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())
  app.use(helmet())
  app.use(morgan(config.nodeEnv === 'dev' ? 'dev' : 'common'))
}
