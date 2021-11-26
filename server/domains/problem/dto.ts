import { LanguageNames } from 'compile-run'
import { ProblemDifficulty, ProblemSkill } from '../../types'

export interface CreateProblemDto {
  body: string
  name: string
  description: string
  difficulty: ProblemDifficulty
  skills: ProblemSkill[]
}

export interface EditProblemDto {
  body?: string
  name?: string
  description?: string
  difficulty?: ProblemDifficulty
  skills?: ProblemSkill[]
}

export interface AddTestcaseDto {
  input: string
  output: string
}

export interface EditTestcaseDto {
  input?: string
  output?: string
}

export interface SubmitProblemDto {
  code: string
  language: LanguageNames
}
