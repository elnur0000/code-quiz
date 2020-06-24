const mongoose = require('mongoose')
const Joi = require('joi')
const crypto = require('crypto')
const { ObjectId } = mongoose.Types

const CandidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      maxlength: 100
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    reports: [String],
    assignedTest: {
      type: ObjectId,
      ref: 'Test',
      required: true
    },
    submittedProblems: [
      new mongoose.Schema({
        code: {
          type: String,
          required: true
        },
        problem: {
          type: ObjectId,
          ref: 'Problem',
          required: true
        }
      })
    ],
    accessToken: {
      type: String,
      required: true
    },
    validFrom: {
      type: Date,
      required: true
    },
    expiresAt: {
      type: Date,
      // expires: '1d',
      required: true
    }

  },
  { timestamps: true }
)

CandidateSchema.methods.addSubmittedProblem = function (doc) {
  const submittedProblemIndex = this.submittedProblems.findIndex(submittedProblem => submittedProblem.problem.toString() === doc.problem)
  if (submittedProblemIndex === -1) return this.submittedProblems.push(doc)

  for (const key in doc) {
    this.submittedProblems[submittedProblemIndex][key] = doc[key]
  }
}

CandidateSchema.methods.setAccessToken = function () {
  const accessToken = crypto.randomBytes(20).toString('hex')

  this.accessToken = crypto
    .createHash('sha256')
    .update(accessToken)
    .digest('hex')
  return accessToken
}

module.exports = {
  Candidate: mongoose.model('Candidate', CandidateSchema)
}
