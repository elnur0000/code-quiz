import {
  groupValidationSchemas
} from '../validation-schemas'
import express from 'express'
import { createGroup, getGroups, deleteGroup, addUser, deleteUser, editUser, editGroup } from '../domains/group/controller'
import { protectedRoute } from '../middleware/auth'
import validator from '../middleware/validator'

const router = express.Router()

router.use(protectedRoute)

router
  .route('/')
  .post(validator(groupValidationSchemas.createGroup), createGroup)
  .get(getGroups)

router
  .route('/:id')
  .delete(deleteGroup)
  .put(validator(groupValidationSchemas.editGroup), editGroup)

router
  .route('/:id/users')
  .post(validator(groupValidationSchemas.addGroupUser), addUser)

router
  .route('/:id/users/:userId')
  .delete(deleteUser)
  .put(validator(groupValidationSchemas.editGroupUser), editUser)

export default router
