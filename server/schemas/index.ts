import { getModelForClass } from '@typegoose/typegoose'
import { Candidate } from './candidate'
import { Group } from './group'
import { Problem } from './problem'
import { ResetPasswordRequest } from './reset-password-request'
import { Test } from './test'
import { User } from './user'

export const CandidateModel = getModelForClass(Candidate)
export const GroupModel = getModelForClass(Group)
export const ProblemModel = getModelForClass(Problem)
export const ResetPasswordRequestModel = getModelForClass(ResetPasswordRequest)
export const TestModel = getModelForClass(Test, { schemaOptions: { timestamps: true } })
export const UserModel = getModelForClass(User)
