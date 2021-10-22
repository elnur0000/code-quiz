import asyncWrapper from '../../utilities/async-wrapper'
import { sendEmail } from '../../utilities/mailer'
import { User } from '../../schemas/user'
import Problem from '../../schemas/problem'
import { AuthenticationError, ValidationError, NotFoundError } from '../../errors'
import { runCode } from '../../services/compile-run'

// @desc      Create a problem
// @route     POST /api/v1/problems
// @access    Private
export const createProblem = asyncWrapper(async (req, res, next) => {
  const problem = await Problem.create({ ...req.body, createdBy: req.user._id })
  res.send(problem)
})

// @desc      Get problems
// @route     Get /api/v1/problems
// @access    Private
export const getProblems = asyncWrapper(async (req, res, next) => {
  const { offset, limit } = req.params
  const problems = await Problem.find({
    $or: [
      { createdBy: req.user._id },
      { status: 'Public' }
    ]
  })
    .skip(offset || 0)
    .limit(limit || 0)
    .exec()
  res.send(problems)
})

// @desc      Get a problem
// @route     Get /api/v1/problems/:id
// @access    Private
export const getProblem = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const problem = await Problem.findOne({
    _id,
    $or: [
      {
        createdBy: req.user._id
      },
      {
        status: 'Public'
      }
    ]
  }).exec()
  if (!problem) throw new NotFoundError('Problem not found')
  res.send(problem)
})

// @desc      Submit a demo problem
// @route     POST /api/v1/problems/:id/submit
// @access    Private
export const submitProblem = asyncWrapper(async (req, res, next) => {
  const { code, language } = req.body
  const _id = req.params.id

  const problem = await Problem.findOne({
    _id,
    $or: [
      {
        createdBy: req.user._id
      },
      {
        status: 'Public'
      }
    ]
  }).exec()
  if (!problem) throw new NotFoundError('Problem not found')

  for (const testcase of problem.testcases) {
    const result = await runCode(language, testcase.input, code, testcase.output)
    if (result.stderr) {
      return res.send({ success: false, stderr: result.stderr.slice(result.stderr.indexOf(',') + 1) })
    }
    if (!result.passed) {
      return res.send({ success: false, ...result })
    }
  }

  res.send({ success: true, testcaseCount: problem.testcases.length })
})

// @desc      edit a problem
// @route     PUT /api/v1/problems/:id
// @access    Private
export const editProblem = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const problem = await Problem.findOneAndUpdate({
    _id,
    $or: [
      {
        createdBy: req.user._id
      },
      {
        status: 'Public'
      }
    ]
  }, req.body, { new: true }).exec()

  if (!problem) throw new NotFoundError('Problem not found')

  res.send(problem)
})

// @desc      delete a problem
// @route     DELETE /api/v1/problems/:id
// @access    Private
export const deleteProblem = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const result = await Problem.deleteOne({
    _id,
    $or: [
      {
        createdBy: req.user._id
      },
      {
        status: 'Public'
      }
    ]
  }).exec()

  if (!result || !result.ok || !result.deletedCount) throw new NotFoundError('Problem not found')

  res.send()
})

// @desc      add testcase to a problem
// @route     POST /api/v1/problems/:id/testcases
// @access    Private
export const addTestcase = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const problem = await Problem.findOne({
    _id,
    $or: [
      {
        createdBy: req.user._id
      },
      {
        status: 'Public'
      }
    ]
  }).exec()

  if (!problem) throw new NotFoundError('Problem not found')

  problem.testcases.push(req.body)

  await problem.save()

  res.send(problem)
})

// @desc      Fetch testcases
// @route     GET /api/v1/problems/:id/testcases
// @access    Private
export const getTestcases = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const testcases = await Problem.findOne({
    _id,
    $or: [
      {
        createdBy: req.user._id
      },
      {
        status: 'Public'
      }
    ]
  }).select('testcases').exec()

  res.send(testcases)
})

// @desc      edit a testcase
// @route     PUT /api/v1/problems/:id/testcases/:testcaseId
// @access    Private
export const editTestcase = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const testcaseId = req.params.testcaseId
  const problem = await Problem.findOne({
    _id,
    $or: [
      {
        createdBy: req.user._id
      },
      {
        status: 'Public'
      }
    ]
  }).exec()

  if (!problem) throw new NotFoundError('Problem not found')

  problem.updateTestcase(testcaseId, req.body)

  await problem.save()

  res.send(problem)
})

// @desc      delete a testcase
// @route     PUT /api/v1/problems/:id/testcases/:testcaseId
// @access    Private
export const deleteTestcase = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const testcaseId = req.params.testcaseId
  const problem = await Problem.findOne({
    _id,
    $or: [
      {
        createdBy: req.user._id
      },
      {
        status: 'Public'
      }
    ]
  }).exec()

  if (!problem) throw new NotFoundError('Problem not found')

  problem.deleteTestcase(testcaseId)

  await problem.save()

  res.send(problem)
})
