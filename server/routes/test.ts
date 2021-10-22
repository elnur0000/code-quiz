import { testValidationSchemas } from '../validation-schemas'
import express from 'express'
import {
  createTest,
  getTests,
  editTest,
  deleteTest,
  invite,
  runCode,
  getTest,
  submitCode
} from '../domains/test/controller'
import { protectedRoute } from '../middleware/auth'
import validator from '../middleware/validator'

const router = express.Router()

router
  .post('/run', validator(testValidationSchemas.runCode), runCode)

router
  .get('/:accessToken', getTest)

router
  .post('/submit', validator(testValidationSchemas.submitCode), submitCode)

router.use(protectedRoute)

router
  .route('/')
  .post(validator(testValidationSchemas.createTest), createTest)
  .get(getTests)

router
  .route('/:id')
  .put(validator(testValidationSchemas.editTest), editTest)
  .delete(deleteTest)

router
  .post('/:id/invite', validator(testValidationSchemas.invite), invite)
export default router
