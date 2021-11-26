/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { AddTestcaseDto, CreateProblemDto, EditProblemDto, EditTestcaseDto, SubmitProblemDto } from '../domains/problem/dto'
import Joi from 'joi'
import { JoiSchemaMap, ProblemDifficulty, ProblemSkill } from '../types/index'
import { LanguageNames } from 'compile-run'

export const createProblem = Joi.object().keys(
  {
    body: Joi.string().required(),
    name: Joi.string().max(50).required(),
    description: Joi.string().max(300).required(),
    difficulty: Joi.string().valid(['Easy', 'Medium', 'Hard'] as ProblemDifficulty[]).required(),
    skills: Joi.array().items(
      Joi.string().valid(
        [
          'Strings',
          'Search',
          'Sorting',
          'Bit Manipulation',
          'Data Structures',
          'Stacks',
          'Trees',
          'Graph Theory',
          'Linked Lists',
          'Queues',
          'Geometry',
          'Probability',
          'Mathematics',
          'Dynamic Programming',
          'Divide and Conquer',
          'Recursion'
        ] as ProblemSkill[]
      )).required()
  } as JoiSchemaMap<CreateProblemDto>
)

export const editProblem = Joi.object().keys(
  {
    body: Joi.string().optional(),
    name: Joi.string().max(50).optional(),
    description: Joi.string().max(300).optional(),
    difficulty: Joi.string().valid(['Easy', 'Medium', 'Hard'] as ProblemDifficulty[]).optional(),
    skills: Joi.array().items(
      Joi.string().valid(
        [
          'Strings',
          'Search',
          'Sorting',
          'Bit Manipulation',
          'Data Structures',
          'Stacks',
          'Trees',
          'Graph Theory',
          'Linked Lists',
          'Queues',
          'Geometry',
          'Probability',
          'Mathematics',
          'Dynamic Programming',
          'Divide and Conquer',
          'Recursion'
        ] as ProblemSkill[]
      )).optional()
  } as JoiSchemaMap<EditProblemDto>
).min(1)

export const addTestcase = Joi.object().keys(
  {
    input: Joi.string().required(),
    output: Joi.string().required()
  } as JoiSchemaMap<AddTestcaseDto>
)

export const editTestcase = Joi.object().keys(
  {
    input: Joi.string().required(),
    output: Joi.string().required()
  } as JoiSchemaMap<EditTestcaseDto>
).min(1)

export const submitProblem = Joi.object().keys(
  {
    code: Joi.string().required(),
    language: Joi.string().valid(['python', 'java', 'node', 'cpp', 'c'] as LanguageNames[]).required()
  } as JoiSchemaMap<SubmitProblemDto>
)
