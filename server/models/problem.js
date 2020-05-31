const mongoose = require('mongoose')
const Joi = require('joi')
const { ObjectId } = mongoose.Types

const ProblemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      maxlength: 50
    },
    createdBy: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: [true, 'Please add a small description'],
      maxlength: 300
    },
    body: {
      type: String,
      required: [true, 'Please add a problem body']
    },
    difficulty: {
      type: String,
      required: [true, 'Please add a difficulty'],
      enum: ['Easy', 'Medium', 'Hard']
    },
    testcases: [
      new mongoose.Schema(
        {
          input: {
            type: String,
            required: true
          },
          output: {
            type: String,
            required: true
          }
        }
      )
    ],
    skills: {
      type: [String],
      required: [true, 'Please add skills'],
      enum: [
        'Strings',
        'Search',
        'Sorting',
        'Bit Manipulation',
        'Data Structures',
        'Stacks',
        'Trees',
        'Graph Theory',
        'Linked Lists',
        'Queues',
        'Geometry',
        'Probability',
        'Mathematics',
        'Dynamic Programming',
        'Divide and Conquer',
        'Recursion'
      ]
    }

  },
  {
    timestamps: true
  }
)

ProblemSchema.methods.deleteTestcase = function (_id) {
  this.testcases = this.testcases.filter(testcase => testcase._id.toString() !== _id)
}

ProblemSchema.methods.groupInvite = function (_id) {
  this.testcases = this.testcases.filter(testcase => testcase._id.toString() !== _id)
}

module.exports = {
  Problem: mongoose.model('Problem', ProblemSchema),
  ProblemValidationSchema: Joi.object().keys({
    body: Joi.string().required(),
    name: Joi.string().max(50).required(),
    description: Joi.string().max(300).required(),
    difficulty: Joi.string().valid(['Easy', 'Medium', 'Hard']).required(),
    skills: Joi.array().items(
      Joi.string().valid(
        [
          'Strings',
          'Search',
          'Sorting',
          'Bit Manipulation',
          'Data Structures',
          'Stacks',
          'Trees',
          'Graph Theory',
          'Linked Lists',
          'Queues',
          'Geometry',
          'Probability',
          'Mathematics',
          'Dynamic Programming',
          'Divide and Conquer',
          'Recursion'
        ]
      )).required()

  }),
  ProblemEditValidationSchema: Joi.object().keys({
    body: Joi.string().optional(),
    name: Joi.string().max(50).optional(),
    description: Joi.string().max(300).optional(),
    difficulty: Joi.string().valid(['Easy', 'Medium', 'Hard']).optional(),
    skills: Joi.array().items(
      Joi.string().valid(
        [
          'Strings',
          'Search',
          'Sorting',
          'Bit Manipulation',
          'Data Structures',
          'Stacks',
          'Trees',
          'Graph Theory',
          'Linked Lists',
          'Queues',
          'Geometry',
          'Probability',
          'Mathematics',
          'Dynamic Programming',
          'Divide and Conquer',
          'Recursion'
        ]
      )).optional()
  }).min(1),
  ProblemAddTestCaseValidationSchema: Joi.object().keys({
    input: Joi.string().required(),
    output: Joi.string().required()
  }),
  ProblemEditTestCaseValidationSchema: Joi.object().keys({
    input: Joi.string().required(),
    output: Joi.string().required()
  }).min(1)
}
