import { prop, Ref } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Problem } from './problem'

export class Submission {
  readonly _id: ObjectId

  @prop({
    required: true
  })
  code: string

  @prop({
    required: true,
    type: () => Problem
  })
  problem: Ref<Problem>
}
