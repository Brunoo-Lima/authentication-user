export interface IUser {
  name: string;
  email: string;
  password: string;
}

export type IUserLogin = IUser & {
  id: string;
  email_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};
