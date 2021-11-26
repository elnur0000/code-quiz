import { DocumentType, isDocumentArray, prop, Ref } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
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
    required: [true, 'Please add skills']

  })
  skills: ProblemSkill[]

  deleteTestcase (this: DocumentType<Problem>, _id: string): void {
    if (isDocumentArray(this.testcases)) {
      this.testcases = this.testcases.filter(testcase => testcase._id.toString() !== _id)
    }
  }

  updateTestcase (this: DocumentType<Problem>, testcaseId: string, doc: Partial<Testcase>): void {
    if (isDocumentArray(this.testcases)) {
      const testcase = this.testcases.find(testcase => testcase._id.toString() === testcaseId)
      if (testcase) {
        testcase.set(doc)
      }
    }
  }

  groupInvite (this: DocumentType<Problem>, _id: string): void {
    if (isDocumentArray(this.testcases)) {
      this.testcases = this.testcases.filter(testcase => testcase._id.toString() !== _id)
    }
  }
}
