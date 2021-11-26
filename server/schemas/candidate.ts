import { DocumentType, isDocumentArray, prop, Ref } from '@typegoose/typegoose'
import crypto from 'crypto'
import { ObjectId } from 'mongodb'
import { Submission } from './submission'
import { Test } from './test'

export class Candidate {
  readonly _id: ObjectId

  @prop({
    required: [true, 'Please add a name'],
    maxlength: 100
  })
  name: string

  @prop({
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  })
  email: string

  @prop()
  reports?: string[]

  @prop({ ref: () => Test })
  assignedTest?: Ref<Test>

  @prop({
    ref: () => Submission
  })
  submittedProblems: Array<Ref<Submission>>

  @prop({
    required: true
  })
  accessToken: string

  @prop({
    required: true
  })
  validFrom: Date

  @prop({
    required: true
  })
  expiresAt: Date

  addSubmittedProblem (this: DocumentType<Candidate>, doc: DocumentType<Submission>): void {
    if (isDocumentArray(this.submittedProblems)) {
      const submittedProblem = this.submittedProblems.find(submittedProblem => submittedProblem.problem?.toString() === doc.problem)
      if (!submittedProblem) {
        this.submittedProblems.push(doc)
        return
      }
      submittedProblem.set(doc)
    }
  }

  setAccessToken (): string {
    const accessToken = crypto.randomBytes(20).toString('hex')

    this.accessToken = crypto
      .createHash('sha256')
      .update(accessToken)
      .digest('hex')
    return accessToken
  }
}
