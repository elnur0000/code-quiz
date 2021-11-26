import { DocumentType, isRefTypeArray, prop, Ref } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Types } from 'mongoose'
import { TestLanguageName } from '../types'
import { Candidate } from './candidate'
import { Problem } from './problem'
import { User } from './user'

export class Test {
  readonly _id: ObjectId

  @prop({
    required: [true, 'Please add a name'],
    maxlength: 100
  })
  name: string

  @prop({ required: true, ref: () => User })
  createdBy: Ref<User>

  @prop({})
  allowedLanguages?: TestLanguageName[]

  @prop({ ref: () => Problem })
  problems: Array<Ref<Problem>>

  @prop({ ref: () => Candidate })
  candidates: Array<Ref<Candidate>>

  @prop({ default: 0 })
  invited: number

  @prop({ default: 0 })
  completed: number

  @prop({ default: 0 })
  incomplete: number

  addCandidate (this: DocumentType<Test>, candidateId: ObjectId): void {
    if (isRefTypeArray(this.candidates, Types.ObjectId)) {
      if (!this.candidates.includes(candidateId)) {
        this.candidates.push(candidateId)
      }
    }
  }
}
