import CommonMiddleware from './common'
import { Express } from 'express'

export default (app: Express): void => {
  CommonMiddleware(app)
}
