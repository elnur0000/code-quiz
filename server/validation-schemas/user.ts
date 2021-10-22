/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { JoiSchemaMap } from '../types/index'
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  UpdateUserDto,
  UpdatePasswordDto
} from '../domains/auth/dto'
import Joi from 'joi'

export const register = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
} as JoiSchemaMap<RegisterDto>)

export const login = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
} as JoiSchemaMap<LoginDto>)

export const forgotPassword = Joi.object().keys({
  email: Joi.string().email().required()
} as JoiSchemaMap<ForgotPasswordDto>).min(1)

export const resetPassword = Joi.object().keys({
  password: Joi.string().min(6).required()
} as JoiSchemaMap<ResetPasswordDto>).min(1)

export const updateUser = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required()
} as JoiSchemaMap<UpdateUserDto>).min(1)

export const updatePassword = Joi.object().keys({
  newPassword: Joi.string().min(6).required(),
  currentPassword: Joi.string().min(6).required()
} as JoiSchemaMap<UpdatePasswordDto>).min(1)
