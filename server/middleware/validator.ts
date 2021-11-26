import { BadRequestError } from '../errors'
import { Schema, ValidationResult } from 'joi'
import { Request, Response, NextFunction } from 'express'

function validate (object: Object, validationSchema: Schema): ValidationResult<Object> {
  return validationSchema.validate(object, {
    allowUnknown: false
  })
}

export default function ValidationMiddleware (validationSchema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = validate(req.body, validationSchema)
    if (validationResult.error) {
      throw new BadRequestError(validationResult.error.details[0].message)
    } else {
      next()
    }
  }
}
