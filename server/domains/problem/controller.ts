import { isDocumentArray } from '@typegoose/typegoose'
import { Request } from 'express'
import { NotFoundError } from '../../errors'
import {
  ProblemModel
} from '../../schemas'
import { runCode } from '../../services/compile-run'
import asyncWrapper from '../../utilities/async-wrapper'
import {
  AddTestcaseDto,
  CreateProblemDto, EditProblemDto,
  EditTestcaseDto, SubmitProblemDto
} from './dto'

// @desc      Create a problem
// @route     POST /api/v1/problems
// @access    Private
export const createProblem = asyncWrapper(async (req: Request<{}, {}, CreateProblemDto>, res, next) => {
  const problem = await ProblemModel.create({ ...req.body, createdBy: req.user._id })
  res.send(problem)
})

// @desc      Get problems
// @route     Get /api/v1/problems
// @access    Private
export const getProblems = asyncWrapper(async (req, res, next) => {
  const { offset, limit } = req.params
  const problems = await ProblemModel.find({
    $or: [
      { createdBy: req.user._id },
      { status: 'Public' }
    ]
  })
    .skip(offset ? parseInt(offset, 10) : 0)
    .limit(limit ? parseInt(limit, 10) : 0)
    .exec()
  res.send(problems)
})

// @desc      Get a problem
// @route     Get /api/v1/problems/:id
// @access    Private
export const getProblem = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const problem = await ProblemModel.findOne({
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
export const submitProblem = asyncWrapper(async (req: Request<any, {}, SubmitProblemDto>, res, next) => {
  const { code, language } = req.body
  const _id = req.params.id

  const problem = await ProblemModel.findOne({
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

  if (isDocumentArray(problem.testcases)) {
    for (const testcase of problem.testcases) {
      if (testcase) {
        const result = await runCode(language, testcase.input, code)
        if (result.stderr) {
          res.send({ success: false, stderr: result.stderr.slice(result.stderr.indexOf(',') + 1) })
          return
        }
        if (result.stdout !== testcase.output) {
          res.send({ success: false, ...result })
          return
        }
      }
    }
  }

  res.send({ success: true, testcaseCount: problem.testcases.length })
})

// @desc      edit a problem
// @route     PUT /api/v1/problems/:id
// @access    Private
export const editProblem = asyncWrapper(async (req: Request<any, {}, EditProblemDto>, res, next) => {
  const _id = req.params.id
  const problem = await ProblemModel.findOneAndUpdate({
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
  const result = await ProblemModel.deleteOne({
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
export const addTestcase = asyncWrapper(async (req: Request<any, {}, AddTestcaseDto>, res, next) => {
  const _id = req.params.id
  const problem = await ProblemModel.findOne({
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

  // @ts-expect-error
  problem.testcases.push(req.body)

  await problem.save()

  res.send(problem)
})

// @desc      Fetch testcases
// @route     GET /api/v1/problems/:id/testcases
// @access    Private
export const getTestcases = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const testcases = await ProblemModel.findOne({
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
export const editTestcase = asyncWrapper(async (req: Request<any, {}, EditTestcaseDto>, res, next) => {
  const _id = req.params.id
  const testcaseId = req.params.testcaseId
  const problem = await ProblemModel.findOne({
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
  const problem = await ProblemModel.findOne({
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
