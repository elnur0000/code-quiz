export interface RegisterBodyDto {
  name: string
  email: string
  password: string
}

export interface LoginBodyDto {
  email: string
  password: string
}

export interface ForgotPasswordBodyDto {
  email: string
}

export interface ResetPasswordBodyDto {
  password: string
}

export interface ResetPasswordParamsDto {
  resetToken?: string
}

export interface UpdateUserBodyDto {
  name: string
  email: string
}

export interface UpdatePasswordBodyDto {
  newPassword: string
  currentPassword: string
}
