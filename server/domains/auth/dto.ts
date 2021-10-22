export interface RegisterDto {
  name: string
  email: string
  password: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface ForgotPasswordDto {
  email: string
}

export interface ResetPasswordDto {
  password: string
}

export interface UpdateUserDto {
  name: string
  email: string
}

export interface UpdatePasswordDto {
  newPassword: string
  currentPassword: string
}
