import { getModelForClass, prop, Ref, isDocumentArray, DocumentType } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Query } from 'mongoose'
import { ProblemDifficulty, ProblemSkill, Testcase } from '../types'
import { TestCase } from './test-case'
import { User } from './user'

export class Problem {
  readonly _id: ObjectId

  @prop({
    required: [true, 'Please add a name'],
    maxlength: 50
  })
  name: string

  @prop({
    type: () => User
  })
  createdBy: Ref<User>

  @prop({
    default: false
  })
  isPublic: boolean

  @prop({
    required: [true, 'Please add a small description'],
    maxlength: 300
  })
  description: string

  @prop({
    required: [true, 'Please add a problem body']
  })
  body: string

  @prop({
    required: [true, 'Please add a difficulty'],
    enum: ['Easy', 'Medium', 'Hard'] as ProblemDifficulty[]
  })
  difficulty: string

  @prop({
    ref: () => TestCase
  })
  testcases: Array<Ref<TestCase>>

  @prop({
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
    ] as ProblemSkill[]
  })
  skills: string[]

  deleteTestcase (this: DocumentType<Problem>, _id: string): void {
    if (isDocumentArray(this.testcases)) {
      this.testcases = this.testcases.filter(testcase => testcase._id.toString() !== _id)
    }
  }

  updateTestcase (this: DocumentType<Problem>, testcaseId: string, doc: Testcase): Query<any, DocumentType<TestCase>> | undefined {
    if (isDocumentArray(this.testcases)) {
      const testcase = this.testcases.find(testcase => testcase._id.toString() === testcaseId)
      if (testcase) {
        return testcase.update(doc)
      }
    }
  }

  groupInvite (this: DocumentType<Problem>, _id: string): void {
    if (isDocumentArray(this.testcases)) {
      this.testcases = this.testcases.filter(testcase => testcase._id.toString() !== _id)
    }
  }
}

export const ProblemModel = getModelForClass(Problem, { schemaOptions: { timestamps: true } })
