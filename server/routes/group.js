const express = require('express')
const {
  createGroup,
  getGroups,
  deleteGroup,
  addUser,
  deleteUser,
  editUser
} = require('../controllers/group-controller')
const { protectedRoute } = require('../middleware/auth')
const { validator } = require('../middleware/validator')

const router = express.Router()

router.use(protectedRoute)

router
  .route('/')
  .post(validator('Group'), createGroup)
  .get(getGroups)

router
  .route('/:id')
  .delete(deleteGroup)

router
  .route('/:id/users')
  .post(validator('Group', 'addUser'), addUser)

router
  .route('/:id/users/:userId')
  .delete(deleteUser)
  .put(validator('Group', 'editUser'), editUser)

module.exports = router
