/* eslint-disable @typescript-eslint/consistent-type-assertions */
import Joi from 'joi'
import {
  AddGroupUserDto,
  CreateGroupDto, EditGroupDto, EditGroupUserDto
} from '../domains/group/dto'
import { JoiSchemaMap } from '../types/index'

export const createGroup = Joi.object().keys(
  {
    name: Joi.string().required()
  } as JoiSchemaMap<CreateGroupDto>
)

export const editGroup = Joi.object().keys(
  {
    name: Joi.string().required()
  } as JoiSchemaMap<EditGroupDto>
)

export const addGroupUser = Joi.object().keys(
  {
    name: Joi.string().required(),
    email: Joi.string().email().required()
  } as JoiSchemaMap<AddGroupUserDto>
)

export const editGroupUser = Joi.object().keys(
  {
    name: Joi.string().required(),
    email: Joi.string().email().required()
  } as JoiSchemaMap<EditGroupUserDto>
).min(1)
