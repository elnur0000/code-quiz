import express from 'express'
import { problemValidationSchemas } from '../validation-schemas'
import {
  addTestcase,
  createProblem,
  deleteProblem,
  deleteTestcase,
  editProblem,
  editTestcase,
  getProblem,
  getProblems,
  getTestcases,
  submitProblem
} from '../domains/problem/controller'
import { protectedRoute } from '../middleware/auth'
import validator from '../middleware/validator'

const router = express.Router()

router.use(protectedRoute)
router
  .route('/')
  .post(validator(problemValidationSchemas.createProblem), createProblem)
  .get(getProblems)

router
  .route('/:id')
  .get(getProblem)
  .put(validator(problemValidationSchemas.editProblem), editProblem)
  .delete(deleteProblem)

router
  .post('/:id/submit', validator(problemValidationSchemas.submitProblem), submitProblem)

// testcase
router
  .route('/:id/testcases')
  .post(validator(problemValidationSchemas.addTestcase), addTestcase)
  .get(getTestcases)

router
  .route('/:id/testcases/:testcaseId')
  .put(validator(problemValidationSchemas.editTestcase), editTestcase)
  .delete(deleteTestcase)

export default router
