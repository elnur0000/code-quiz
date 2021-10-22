import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

export class GroupUser {
  readonly _id: ObjectId

  @prop({
    required: [true, 'Please add an email to user'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  })
  email: string

  @prop({
    required: [true, 'Please add a name to user'],
    maxlength: 50
  })
  name: string
}
