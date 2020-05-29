const express = require('express')
const {
  createTest,
  getTests,
  editTest,
  deleteTest,
  invite,
  runCode
} = require('../controllers/test-controller')
const { protectedRoute } = require('../middleware/auth')
const { validator } = require('../middleware/validator')

const router = express.Router()

router
  .post('/run', validator('Test', 'runCode'), runCode)

router.use(protectedRoute)

router
  .route('/')
  .post(validator('Test'), createTest)
  .get(getTests)

router
  .route('/:id')
  .put(validator('Test', 'edit'), editTest)
  .delete(deleteTest)

router
  .post('/:id/invite', validator('Test', 'invite'), invite)
module.exports = router
