import {
  NextFunction,
  Request,
  Response
} from 'express'
import { CustomRequestHandler } from '../types'

export default (fn: CustomRequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-expect-error
    return fn(req, res, next).catch(next)
  }
}
