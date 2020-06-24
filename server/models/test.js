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
    candidates: [
      {
        type: ObjectId,
        ref: 'Candidate'
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

TestSchema.methods.addCandidate = function (candidateId) {
  if (this.candidates.indexOf(candidateId) === -1) {
    this.candidates.push(candidateId)
  }
}

module.exports = {
  Test: mongoose.model('Test', TestSchema),
  TestValidationSchema: Joi.object().keys({
    name: Joi.string().max(100).required(),
    allowedLanguages: Joi.array().items(Joi.string().valid(['Node.js', 'Java', 'C', 'C++', 'Python'])).required(),
    problems: Joi.array().items(Joi.string()).required()
  }),
  TestEditValidationSchema: Joi.object().keys({
    name: Joi.string().max(100).required(),
    allowedLanguages: Joi.array().items(Joi.string().valid(['Node.js', 'Java', 'C', 'C++', 'Python'])).required(),
    problems: Joi.array().items(Joi.string()).required()
  }).min(1),
  TestInviteValidationSchema: Joi.object().keys({
    validFrom: Joi.date().required(),
    expiresAt: Joi.date().required(),
    groupId: Joi.string().allow('').optional(),
    name: Joi.string().when('groupId', { is: Joi.exist(), then: Joi.allow('').optional(), otherwise: Joi.required() }),
    email: Joi.string().email().when('groupId', { is: Joi.exist(), then: Joi.allow('').optional(), otherwise: Joi.required() })
  }),
  TestRunCodeValidationSchema: Joi.object().keys({
    language: Joi.string().valid(['python', 'cpp', 'c', 'node', 'java']).required(),
    stdin: Joi.string().required(),
    code: Joi.string().required()
  })
}
