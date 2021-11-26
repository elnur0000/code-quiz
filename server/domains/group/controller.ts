import { NotFoundError } from '../../errors'
import {
  GroupModel
} from '../../schemas'
import asyncWrapper from '../../utilities/async-wrapper'

// @desc      Create a group
// @route     POST /api/v1/groups
// @access    Private
export const createGroup = asyncWrapper(async (req, res, next) => {
  const group = await GroupModel.create({ ...req.body, createdBy: req.user._id })

  res.send(group)
})

// @desc      Fetch groups
// @route     GET /api/v1/groups
// @access    Private
export const getGroups = asyncWrapper(async (req, res, next) => {
  const { offset, limit } = req.params
  const groups = await GroupModel.find({
    createdBy: req.user._id
  })
    .skip(offset ? parseInt(offset, 10) : 0)
    .limit(limit ? parseInt(limit, 10) : 0)
    .exec()
  res.send(groups)
})

// @desc      Edit groups
// @route     PUT /api/v1/groups/:id
// @access    Private
export const editGroup = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const group = await GroupModel.findOneAndUpdate({
    _id,
    createdBy: req.user._id
  }, req.body, { new: true }).exec()

  if (!group) throw new NotFoundError('group not found')

  res.send(group)
})

// @desc      delete a group
// @route     DELETE /api/v1/groups/:id
// @access    Private
export const deleteGroup = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const result = await GroupModel.deleteOne({
    _id,
    createdBy: req.user._id
  }).exec()

  if (!result || !result.ok || !result.deletedCount) throw new NotFoundError('Group not found')

  res.send()
})

// @desc      Add a user to group
// @route     POST /api/v1/groups/:id/users
// @access    Private
export const addUser = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const group = await GroupModel.findOne({
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
export const editUser = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const { userId } = req.params
  const group = await GroupModel.findOne({
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
export const deleteUser = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const { userId } = req.params
  const group = await GroupModel.findOne({
    _id,
    createdBy: req.user._id
  }).exec()

  if (!group) throw new NotFoundError('Group not found')

  group.deleteUser(userId)

  await group.save()

  res.send(group)
})
