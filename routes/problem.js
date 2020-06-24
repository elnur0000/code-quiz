const express = require('express')
const {
  createProblem,
  getProblems,
  getProblem,
  editProblem,
  addTestcase,
  editTestcase,
  getTestcases,
  deleteTestcase,
  deleteProblem,
  submitProblem
} = require('../controllers/problem-controller')
const { protectedRoute } = require('../middleware/auth')
const { validator } = require('../middleware/validator')

const router = express.Router()

router.use(protectedRoute)
router
  .route('/')
  .post(validator('Problem'), createProblem)
  .get(getProblems)

router
  .route('/:id')
  .get(getProblem)
  .put(validator('Problem', 'edit'), editProblem)
  .delete(deleteProblem)

router
  .post('/:id/submit', submitProblem)

// testcase
router
  .route('/:id/testcases')
  .post(validator('Problem', 'addTestcase'), addTestcase)
  .get(getTestcases)

router
  .route('/:id/testcases/:testcaseId')
  .put(validator('Problem', 'editTestcase'), editTestcase)
  .delete(deleteTestcase)

module.exports = router
