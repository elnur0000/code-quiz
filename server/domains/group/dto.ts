export interface CreateGroupDto {
  name: string
}

export interface EditGroupDto {
  name: string
}

export interface AddGroupUserDto {
  name: string
  email: string
}

export interface EditGroupUserDto {
  name?: string
  email?: string
}
