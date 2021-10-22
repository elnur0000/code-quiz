import * as config from '../../config'
import crypto from 'crypto'
import { Request } from 'express'
import { NotFoundError, ValidationError } from '../../errors'
import { CandidateModel } from '../../schemas/candidate'
import { GroupModel } from '../../schemas/group'
import { ProblemModel } from '../../schemas/problem'
import { TestModel } from '../../schemas/test'
import * as compileRunService from '../../services/compile-run'
import asyncWrapper from '../../utilities/async-wrapper'
import { testInvitationTemplate } from '../../utilities/email-templates'
import { sendEmail } from '../../utilities/mailer'
import {
  CreateTestBodyDto,
  EditTestBodyDto,
  GetTestsQueryParamsDto, RunCodeBodyDto, SubmitCodeBodyDto,
  SubmitCodeQueryDto, GetTestParamsDto, EditTestParamsDto, DeleteTestParamsDto
} from './dto'
import { GroupUser } from '../../types'

// @desc      Create a test
// @route     POST /api/v1/tests
// @access    Private
export const createTest = asyncWrapper(async (req: Request<{}, {}, CreateTestBodyDto>, res, next) => {
  const test = await TestModel.create({ ...req.body, createdBy: req.user._id })
  res.send(test)
})

// @desc      Fetch tests
// @route     GET /api/v1/tests
// @access    Private
export const getTests = asyncWrapper(async (req: Request<{}, {}, {}, GetTestsQueryParamsDto>, res, next) => {
  const { offset, limit } = req.query
  const tests = await TestModel.find({
    createdBy: req.user._id
  })
    .skip(offset ? parseInt(offset, 10) : 0)
    .limit(limit ? parseInt(limit, 10) : 0)
    .populate({
      path: 'candidates',
      populate: {
        path: 'submittedProblems.problem'
      }
    }).exec()

  res.send(tests)
})

// @desc      Fetch test
// @route     GET /api/v1/tests/:accessToken
// @access    Public
export const getTest = asyncWrapper(async (req: Request<GetTestParamsDto>, res, next) => {
  if (!req.params.accessToken) throw new ValidationError('Access token is required')
  const accessToken = crypto
    .createHash('sha256')
    .update(req.params.accessToken)
    .digest('hex')
  const candidate = await CandidateModel.findOne({
    accessToken,
    expiresAt: { $gt: new Date() },
    validFrom: { $lt: new Date() }
  }).populate({
    path: 'assignedTest',
    populate: {
      path: 'problems'
    }
  }).exec()
  if (!candidate) throw new NotFoundError('Invalid token or invitation is expired')
  if (!candidate.assignedTest) throw new NotFoundError('Assigned {TestModel} no longer exist')
  res.send(candidate.assignedTest)
})

// @desc      edit a test
// @route     PUT /api/v1/tests/:id
// @access    Private
export const editTest = asyncWrapper(async (req: Request<EditTestParamsDto, {}, EditTestBodyDto>, res, next) => {
  const _id = req.params.id
  const test = await TestModel.findOneAndUpdate({
    _id,
    createdBy: req.user._id
  }, req.body, { new: true }).exec()

  if (!test) throw new NotFoundError('{TestModel} not found')

  res.send(test)
})

// @desc      delete a test
// @route     DELETE /api/v1/tests/:id
// @access    Private
export const deleteTest = asyncWrapper(async (req: Request<DeleteTestParamsDto>, res, next) => {
  const _id = req.params.id
  const result = await TestModel.deleteOne({
    _id,
    createdBy: req.user._id
  }).exec()

  if (!result || !result.ok || !result.deletedCount) throw new NotFoundError('{TestModel} not found')

  res.send()
})

// @desc      invite a candidate
// @route     POST /api/v1/tests/:id/invite
// @access    Private
export const invite = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const { groupId, name, email, validFrom, expiresAt } = req.body

  const test = await TestModel.findOne({
    _id,
    createdBy: req.user._id
  }).exec()

  if (!test) throw new NotFoundError('{TestModel} not found')

  if (!groupId) {
    const candidate = new CandidateModel({ name, email, validFrom, expiresAt, assignedTest: test._id })
    const accessToken = candidate.setAccessToken()
    await candidate.save()
    test.addCandidate(candidate._id)
    const invitationUrl = `${config.frontendUrl}/test/${accessToken}`
    try {
      await sendEmail({
        to: email,
        subject: 'Codequiz {TestModel} Invitation',
        html: testInvitationTemplate(invitationUrl)
      })
      test.invited++
      test.incomplete++
      await test.save()
      res.send(await test.populate('candidates').execPopulate())
    } catch (err) {
      await candidate.remove()
      throw new Error('Something wrong with the email service or provided email is incorrect')
    }
  }

  const group = await GroupModel.findOne({
    _id: groupId,
    createdBy: req.user._id
  }).exec()

  if (!group) throw new NotFoundError('GroupModel not found')

  for (const user of group.users as GroupUser[]) {
    const { name, email } = user
    const candidate = new CandidateModel({ name, email, validFrom, expiresAt, assignedTest: test._id })
    const accessToken = candidate.setAccessToken()
    await candidate.save()
    test.addCandidate(candidate._id)
    const invitationUrl = `${config.frontendUrl}/test/${accessToken}`
    await sendEmail({
      to: email,
      subject: 'Codequiz {TestModel} Invitation',
      html: testInvitationTemplate(invitationUrl)
    })
  }
  test.invited += group.users.length
  test.incomplete += group.users.length
  await test.save()
  res.send(await test.populate('candidates').execPopulate())
})

// @desc      run a code
// @route     POST /api/v1/tests/run
// @access    Public

export const runCode = asyncWrapper(async (req, res, next) => {
  const { stdin, code, language } = req.body as RunCodeBodyDto
  const result = await compileRunService.runCode(language, stdin, code)
  if (result.stderr) {
    result.stderr = result.stderr.slice(result.stderr.indexOf(',') + 1)
  }
  res.send(result)
})

// @desc      submit a code
// @route     POST /api/v1/tests/submit
// @access    Public
export const submitCode = asyncWrapper(async (req: Request<{}, {}, SubmitCodeBodyDto, SubmitCodeQueryDto>, res, next) => {
  const { code, language, problemId } = req.body
  let { accessToken } = req.query
  if (!accessToken) throw new ValidationError('Access token is required')
  accessToken = crypto
    .createHash('sha256')
    .update(accessToken)
    .digest('hex')
  const candidate = await CandidateModel.findOne({
    accessToken,
    expiresAt: { $gt: new Date() },
    validFrom: { $lt: new Date() }
  }).populate({
    path: 'assignedTest'
  }).exec()

  if (!candidate) throw new NotFoundError('Invalid token or invitation is expired')

  if (!candidate.assignedTest) throw new NotFoundError('Assigned {TestModel} no longer exist')

  if (candidate.assignedTest.problems.findIndex((problem) => problem._id.toString() === problemId) === -1) throw new NotFoundError("ProblemModel isn't attached to the test")

  const problem = await ProblemModel.findById(problemId).exec()

  if (!problem) throw new NotFoundError('ProblemModel not found')

  const incomplete = candidate.submittedProblems.length === 0
  candidate.addSubmittedProblem({ problem: problemId, code })
  await candidate.save()
  if (incomplete) {
    const test = await TestModel.findById(candidate.assignedTest._id).exec()
    test.incomplete--
    test.completed++
    await test.save()
  }
  for (const testcase of problem.testcases) {
    const result = await compileRunService.runCode(language, testcase.input, code)
    if (result.stderr) {
      res.send({ success: false, stderr: result.stderr.slice(result.stderr.indexOf(',') + 1) })
      return
    }
    if (!result.passed) {
      res.send({
        success: false,
        // TODO: not sure about trimming, verify that it's needed
        passed: result.stdout.trim() === testcase.output.trim(),
        stdin: testcase.input,
        expectedStdout: testcase.output,
        ...result
      })
      return
    }
  }
  res.send({ success: true, testcaseCount: problem.testcases.length })
})
