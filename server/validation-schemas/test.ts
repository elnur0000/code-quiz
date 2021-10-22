/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { JoiSchemaMap, TestLanguageName } from '../types/index'
import {
  RunCodeBodyDto,
  CreateTestBodyDto,
  EditTestBodyDto,
  InviteBodyDto,
  SubmitCodeBodyDto
} from '../domains/test/dto'
import Joi from 'joi'
import {
  LanguageNames
} from 'compile-run'

export const runCode = Joi.object().keys({
  language: Joi.string().valid(['python', 'c', 'cpp', 'java', 'node'] as LanguageNames[]).required(),
  stdin: Joi.string().required(),
  code: Joi.string().required()
} as JoiSchemaMap<RunCodeBodyDto>)

export const submitCode = Joi.object().keys({
  code: Joi.string().required(),
  language: Joi.string().valid(['python', 'c', 'cpp', 'java', 'node'] as LanguageNames[]).required(),
  problemId: Joi.string().length(36).required()
} as JoiSchemaMap<SubmitCodeBodyDto>)

export const createTest = Joi.object().keys({
  name: Joi.string().max(100).required(),
  allowedLanguages: Joi.array().items(Joi.string().valid(['Node.js', 'Java', 'C', 'C++', 'Python'] as TestLanguageName[])).required(),
  problems: Joi.array().items(Joi.string()).required()
} as JoiSchemaMap<CreateTestBodyDto>)

export const editTest = Joi.object().keys({
  name: Joi.string().max(100).required(),
  allowedLanguages: Joi.array().items(Joi.string().valid(['Node.js', 'Java', 'C', 'C++', 'Python'])).required(),
  problems: Joi.array().items(Joi.string()).required()
} as JoiSchemaMap<EditTestBodyDto>).min(1)

export const invite = Joi.object().keys({
  validFrom: Joi.date().required(),
  expiresAt: Joi.date().required(),
  groupId: Joi.string().allow('').optional(),
  name: Joi.string().when('groupId', { is: Joi.exist(), then: Joi.allow('').optional(), otherwise: Joi.required() }),
  email: Joi.string().email().when('groupId', { is: Joi.exist(), then: Joi.allow('').optional(), otherwise: Joi.required() })
} as JoiSchemaMap<InviteBodyDto>)
