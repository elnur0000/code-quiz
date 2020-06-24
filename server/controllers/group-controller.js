const asyncWrapper = require('../utilities/async-wrapper').AsyncWrapper
const { sendEmail } = require('../utilities/mailer')
const { Group } = require('../models/group')
const { AuthenticationError, ValidationError, NotFoundError } = require('../errors')

// @desc      Create a group
// @route     POST /api/v1/groups
// @access    Private
exports.createGroup = asyncWrapper(async (req, res, next) => {
  const group = await Group.create({ ...req.body, createdBy: req.user._id })

  res.send(group)
})

// @desc      Fetch groups
// @route     GET /api/v1/groups
// @access    Private
exports.getGroups = asyncWrapper(async (req, res, next) => {
  const { offset, limit } = req.params
  const groups = await Group.find({
    createdBy: req.user._id
  })
    .skip(offset || 0)
    .limit(limit || 0)
    .exec()
  res.send(groups)
})

// @desc      Edit groups
// @route     PUT /api/v1/groups/:id
// @access    Private
exports.editGroup = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const group = await Group.findOneAndUpdate({
    _id,
    createdBy: req.user._id
  }, req.body, { new: true }).exec()

  if (!group) throw new NotFoundError('group not found')

  res.send(group)
})

// @desc      delete a group
// @route     DELETE /api/v1/groups/:id
// @access    Private
exports.deleteGroup = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const result = await Group.deleteOne({
    _id,
    createdBy: req.user._id
  }).exec()

  if (!result || !result.ok || !result.deletedCount) throw new NotFoundError('Group not found')

  res.send()
})

// @desc      Add a user to group
// @route     POST /api/v1/groups/:id/users
// @access    Private
exports.addUser = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const group = await Group.findOne({
    _id,
    createdBy: req.user._id
  }).exec()

  if (!group) throw new NotFoundError('Group not found')

  group.users.push(req.body)

  await group.save()

  res.send(group)
})

// @desc      edit a user in group
// @route     PUT /api/v1/groups/:id/users/:userId
// @access    Private
exports.editUser = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const { userId } = req.params
  const group = await Group.findOne({
    _id,
    createdBy: req.user._id
  }).exec()

  if (!group) throw new NotFoundError('Group not found')

  group.updateUser(userId, req.body)

  await group.save()

  res.send(group)
})

// @desc      Delete a user from group
// @route     DELETE /api/v1/groups/:id/users/:userId
// @access    Private
exports.deleteUser = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const { userId } = req.params
  const group = await Group.findOne({
    _id,
    createdBy: req.user._id
  }).exec()

  if (!group) throw new NotFoundError('Group not found')

  group.deleteUser(userId)

  await group.save()

  res.send(group)
})
