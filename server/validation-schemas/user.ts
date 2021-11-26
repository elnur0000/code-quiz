/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { JoiSchemaMap } from '../types/index'
import {
  RegisterBodyDto,
  LoginBodyDto,
  ForgotPasswordBodyDto,
  ResetPasswordBodyDto,
  UpdateUserBodyDto,
  UpdatePasswordBodyDto
} from '../domains/auth/dto'
import Joi from 'joi'

export const register = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
} as JoiSchemaMap<RegisterBodyDto>)

export const login = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
} as JoiSchemaMap<LoginBodyDto>)

export const forgotPassword = Joi.object().keys({
  email: Joi.string().email().required()
} as JoiSchemaMap<ForgotPasswordBodyDto>).min(1)

export const resetPassword = Joi.object().keys({
  password: Joi.string().min(6).required()
} as JoiSchemaMap<ResetPasswordBodyDto>).min(1)

export const updateUser = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required()
} as JoiSchemaMap<UpdateUserBodyDto>).min(1)

export const updatePassword = Joi.object().keys({
  newPassword: Joi.string().min(6).required(),
  currentPassword: Joi.string().min(6).required()
} as JoiSchemaMap<UpdatePasswordBodyDto>).min(1)
