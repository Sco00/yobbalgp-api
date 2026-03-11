export interface JwtAccessPayload {
  id: string;
  email: string;
  role: string;
}


export interface JwtRefreshPayload {
  email: string;
}