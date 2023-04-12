export type AuthenticatedUserType = {
  userId: number;
  email: string;
  name: string;
  accessToken: string;
};

export type JwtPayload = {
  userId: number;
  email: string;
  name: string;
};

export type SessionDto = JwtPayload;
