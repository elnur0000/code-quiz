import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

export class TestCase {
  readonly _id: ObjectId

  @prop({
    required: true
  })
  input: string

  @prop({
    required: true
  })
  output: string
}
