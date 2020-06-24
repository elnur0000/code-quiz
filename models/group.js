const mongoose = require('mongoose')
const Joi = require('joi')
const { ObjectId } = mongoose.Types

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      maxlength: 50
    },
    users: [
      new mongoose.Schema({
        email: {
          type: String,
          required: [true, 'Please add an email to user'],
          match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
          ]
        },
        name: {
          type: String,
          required: [true, 'Please add a name to user'],
          maxlength: 50
        }
      })
    ],
    createdBy: {
      type: ObjectId,
      ref: 'User',
      required: true
    }
  }
)

GroupSchema.methods.updateUser = function (_id, doc) {
  const userIndex = this.users.findIndex(user => user._id.toString() === _id)

  for (const key in doc) {
    this.users[userIndex][key] = doc[key]
  }
}

GroupSchema.methods.deleteUser = function (_id) {
  this.users = this.users.filter(user => user._id.toString() !== _id)
}

module.exports = {
  Group: mongoose.model('Group', GroupSchema),
  GroupValidationSchema: Joi.object().keys({
    name: Joi.string().required()
  }),
  GroupAddUserValidationSchema: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required()
  }),
  GroupEditUserValidationSchema: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required()
  }).min(1)
}
