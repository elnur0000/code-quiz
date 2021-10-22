import {
  LanguageNames
} from 'compile-run'
import { ID, TestLanguageName } from '../../types'

export interface RunCodeBodyDto {
  stdin: string
  code: string
  language: LanguageNames
}

export interface SubmitCodeBodyDto {
  problemId: string
  code: string
  language: LanguageNames
}

export interface SubmitCodeQueryDto {
  accessToken?: string
}

export interface CreateTestBodyDto {
  name: string
  allowedLanguages: TestLanguageName[]
  problems: ID[]
}

export interface EditTestBodyDto {
  name?: string
  allowedLanguages?: TestLanguageName[]
  problems?: ID[]
}

export interface EditTestParamsDto {
  id?: string
}

export interface DeleteTestParamsDto {
  id?: string
}

export interface GetTestsQueryParamsDto {
  offset?: string
  limit?: string
}
export interface GetTestParamsDto {
  accessToken?: string
}

export interface InviteBodyDto {
  validFrom: Date
  expiresAt: Date
  groupId?: string
  name?: string
  email?: string
}
