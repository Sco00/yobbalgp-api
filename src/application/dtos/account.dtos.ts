export interface LoginInput {
  email:    string
  password: string
}

export interface CreateAccountInput {
  email:    string
  password: string
  roleId:   string
  personId: string
}

export interface RefreshTokenInput {
  refreshToken: string
}
