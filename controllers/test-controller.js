const asyncWrapper = require('../utilities/async-wrapper').AsyncWrapper
const { Test } = require('../models/test')
const { Group } = require('../models/group')
const { Problem } = require('../models/problem')
const { Candidate } = require('../models/candidate')
const { AuthenticationError, ValidationError, NotFoundError } = require('../errors')
const { sendEmail } = require('../utilities/mailer')
const { testInvitationTemplate } = require('../utilities/email-templates')
const { runCode, runCodeAgainstTestcase } = require('../services/compile-run')
const crypto = require('crypto')

// @desc      Create a group
// @route     POST /api/v1/tests
// @access    Private
exports.createTest = asyncWrapper(async (req, res, next) => {
  const test = await Test.create({ ...req.body, createdBy: req.user._id })

  res.send(test)
})

// @desc      Fetch tests
// @route     GET /api/v1/tests
// @access    Private
exports.getTests = asyncWrapper(async (req, res, next) => {
  const { offset, limit } = req.params

  const tests = await Test.find({
    createdBy: req.user._id
  })
    .skip(offset || 0)
    .limit(limit || 0)
    .populate({
      path: 'candidates',
      populate: {
        path: 'submittedProblems.problem'
      }
    })
    .exec()
  res.send(tests)
})

// @desc      Fetch test
// @route     GET /api/v1/tests/:accessToken
// @access    Public
exports.getTest = asyncWrapper(async (req, res, next) => {
  const accessToken = crypto
    .createHash('sha256')
    .update(req.params.accessToken)
    .digest('hex')
  const candidate = await Candidate.findOne({
    accessToken,
    expiresAt: { $gt: Date.now() },
    validFrom: { $lt: Date.now() }
  }).populate({
    path: 'assignedTest',
    populate: {
      path: 'problems'
    }
  }).exec()
  if (!candidate) throw new NotFoundError('Invalid token or invitation is expired')
  if (!candidate.assignedTest) throw new NotFoundError('Assigned Test no longer exist')
  res.send(candidate.assignedTest)
})

// @desc      edit a test
// @route     PUT /api/v1/tests/:id
// @access    Private
exports.editTest = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const test = await Test.findOneAndUpdate({
    _id,
    createdBy: req.user._id
  }, req.body, { new: true }).exec()

  if (!test) throw new NotFoundError('Test not found')

  res.send(test)
})

// @desc      delete a test
// @route     DELETE /api/v1/tests/:id
// @access    Private
exports.deleteTest = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const result = await Test.deleteOne({
    _id,
    createdBy: req.user._id
  }).exec()

  if (!result || !result.ok || !result.deletedCount) throw new NotFoundError('Test not found')

  res.send()
})

// @desc      invite a candidate
// @route     POST /api/v1/tests/:id/invite
// @access    Private
exports.invite = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const { groupId, name, email, validFrom, expiresAt } = req.body
  const test = await Test.findOne({
    _id,
    createdBy: req.user._id
  }).exec()
  if (!test) throw new NotFoundError('Test not found')

  if (!groupId) {
    const candidate = new Candidate({ name, email, validFrom, expiresAt, assignedTest: test._id })
    const accessToken = candidate.setAccessToken()
    await candidate.save()
    test.addCandidate(candidate._id)
    const invitationUrl = `${req.protocol + '://' + req.get('host')}/test/${accessToken}`
    try {
      await sendEmail(email, 'Codequiz Test Invitation', testInvitationTemplate(invitationUrl), 'html')
      test.invited++
      test.incomplete++
      await test.save()
      return res.send(await test.populate('candidates').execPopulate())
    } catch (err) {
      candidate.remove()
      throw new Error('Something wrong with the email service or provided email is incorrect')
    }
  }

  const group = await Group.findOne({
    _id: groupId,
    createdBy: req.user._id
  }).exec()

  if (!group) throw new NotFoundError('Group not found')

  for (const user of group.users) {
    const { name, email } = user
    const candidate = new Candidate({ name, email, validFrom, expiresAt, assignedTest: test._id })
    const accessToken = candidate.setAccessToken()
    await candidate.save()
    test.addCandidate(candidate._id)
    const invitationUrl = `${req.protocol + '://' + req.get('host')}/test/${accessToken}`
    await sendEmail(email, 'Codequiz Test Invitation', testInvitationTemplate(invitationUrl), 'html')
  }
  test.invited += group.users.length
  test.incomplete += group.users.length
  await test.save()
  res.send(await test.populate('candidates').execPopulate())
})

// @desc      run a code
// @route     POST /api/v1/tests/run
// @access    Public
exports.runCode = asyncWrapper(async (req, res, next) => {
  const { stdin, code, language } = req.body
  const result = await runCode(language, stdin, code)
  if (result.stderr) {
    result.stderr = result.stderr.slice(result.stderr.indexOf(',') + 1)
  }
  res.send(result)
})

// @desc      submit a code
// @route     POST /api/v1/tests/submit
// @access    Public
exports.submitCode = asyncWrapper(async (req, res, next) => {
  const { code, language, problemId } = req.body
  let { accessToken } = req.query
  if (!accessToken) throw new ValidationError('Access token is required')
  accessToken = crypto
    .createHash('sha256')
    .update(accessToken)
    .digest('hex')
  const candidate = await Candidate.findOne({
    accessToken,
    expiresAt: { $gt: Date.now() },
    validFrom: { $lt: Date.now() }
  }).populate({
    path: 'assignedTest'
  }).exec()

  if (!candidate) throw new NotFoundError('Invalid token or invitation is expired')

  if (!candidate.assignedTest) throw new NotFoundError('Assigned Test no longer exist')

  if (candidate.assignedTest.problems.findIndex((problem) => problem._id.toString() === problemId) === -1) throw new NotFoundError("Problem isn't attached to the test")

  const problem = await Problem.findById(problemId).exec()

  if (!problem) throw new NotFoundError('Problem not found')

  const incomplete = candidate.submittedProblems.length === 0
  candidate.addSubmittedProblem({ problem: problemId, code })
  await candidate.save()
  if (incomplete) {
    const test = await Test.findById(candidate.assignedTest._id).exec()
    test.incomplete--
    test.completed++
    await test.save()
  }
  for (const testcase of problem.testcases) {
    const result = await runCodeAgainstTestcase(language, testcase.input, code, testcase.output)
    if (result.stderr) {
      return res.send({ success: false, stderr: result.stderr.slice(result.stderr.indexOf(',') + 1) })
    }
    if (!result.passed) {
      return res.send({ success: false, ...result })
    }
  }
  res.send({ success: true, testcaseCount: problem.testcases.length })
})
