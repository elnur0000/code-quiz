const mongoose = require('mongoose')
const Joi = require('joi')
const { ObjectId } = mongoose.Types

const TestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      maxlength: 100
    },
    createdBy: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    allowedLanguages: [
      {
        type: String,
        enum: ['Node.js', 'Java', 'C', 'C++', 'Python']
      }
    ],
    problems: [
      {
        type: ObjectId,
        ref: 'Problem'
      }
    ],
    invited: {
      type: Number,
      default: 0
    },
    completed: {
      type: Number,
      default: 0
    },
    incomplete: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

module.exports = {
  Test: mongoose.model('Test', TestSchema),
  TestValidationSchema: Joi.object().keys({
    name: Joi.string().max(100).required(),
    allowedLanguages: Joi.string().valid(['Node.js', 'Java', 'C', 'C++', 'Python']).required(),
    problems: Joi.array().items(Joi.string()).required()
  }),
  TestEditValidationSchema: Joi.object().keys({
    name: Joi.string().max(100).required(),
    allowedLanguages: Joi.string().valid(['Node.js', 'Java', 'C', 'C++', 'Python']).required(),
    problems: Joi.array().items(Joi.string()).required()
  }).min(1),
  TestInviteValidationSchema: Joi.object().keys({
    validFrom: Joi.date().required(),
    expiresAt: Joi.date().required(),
    groupId: Joi.string()
      .when('name', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() })
      .when('email', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() }),
    name: Joi.string(),
    email: Joi.string().email()
  }),
  TestRunCodeValidationSchema: Joi.object().keys({
    language: Joi.string().valid(['python', 'cpp', 'c', 'node', 'java']).required(),
    stdin: Joi.string().required(),
    code: Joi.string().required()
  })
}
