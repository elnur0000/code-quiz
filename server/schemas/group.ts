import { DocumentType, isDocumentArray, prop, Ref } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { GroupUser } from './group-user'
import { User } from './user'

export class Group {
  readonly _id: ObjectId

  @prop({
    required: [true, 'Please add a name'],
    unique: true,
    maxlength: 50
  })
  name: string

  @prop({
    ref: () => GroupUser
  })
  users: Array<Ref<GroupUser>>

  @prop({
    required: true,
    ref: () => User
  })
  createdBy: Ref<User>

  updateUser (this: DocumentType<Group>, _id: string, doc: GroupUser): void {
    if (isDocumentArray(this.users)) {
      const user = this.users.find(user => user._id.toString() === _id)
      user?.set(doc)
    }
  }

  deleteUser (this: DocumentType<Group>, _id: string): void {
    if (isDocumentArray(this.users)) {
      this.users = this.users.filter(user => user._id.toString() !== _id)
    }
  }
}
