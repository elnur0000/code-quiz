import { RequestHandler } from 'express'
import { Schema } from 'joi'
import { Types, Document } from 'mongoose'

export type ID = Types.ObjectId

export type JoiSchemaMap<T> = {
  [Property in keyof T]: Schema
}

export type TestLanguageName = 'Node.js' | 'Java' | 'C' | 'C++' | 'Python'

export interface JwtUserPayload {
  id: string
}

export interface RequestUser {
  _id: ID
  name: string
  email: string
  resetRequestLockedUntil?: Date
  resetAttempts?: number
  createdAt?: Date
}

export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard'

export type ProblemSkill =
'Strings' |
'Search' |
'Sorting' |
'Bit Manipulation' |
'Data Structures' |
'Stacks' |
'Trees' |
'Graph Theory' |
'Linked Lists' |
'Queues' |
'Geometry' |
'Probability' |
'Mathematics' |
'Dynamic Programming' |
'Divide and Conquer' |
'Recursion'

export interface Testcase {
  input: string
  output: string
}

export interface GroupUser {
  email: string
  name: string
}

export interface SubmittedProblem {
  code: string
  problem: string
}
export type Select<M, K extends keyof M> = Pick<M, K> & Document

export type Populated<M, K extends keyof M> = Omit<M, K> &
{
  [P in K]: Exclude<M[P], ID[] | ID>
}

export type FunctionChangedReturn<TFn, TR> = TFn extends (...a: infer A) => any ? (...a: A) => TR: never

export type CustomRequestHandler = FunctionChangedReturn<RequestHandler, Promise<void> | void>

export type IncludeMachingProperties<T, V> = Pick<
T,
{ [K in keyof T]-?: T[K] extends V ? K : never }[keyof T]
>

export type Primitive = string | number | boolean | null | undefined
export type FlattenPairs<T> = {[K in keyof T]: T[K] extends Primitive ? [K, T[K]] : FlattenPairs<T[K]>}[keyof T] & [PropertyKey, Primitive]
export type Flatten<T> = {[P in FlattenPairs<T> as P[0]]: P[1]}
