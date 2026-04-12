export const API_URL = 'http://localhost:3000';

interface UserPostBody {
  name?: string;
  email: string;
  password: string;
}

type UserLogin = Omit<UserPostBody, 'name'>;

export function USER_REGISTER(body: UserPostBody) {
  return {
    url: API_URL + '/user',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_LOGIN({ email, password }: UserLogin) {
  return {
    url: API_URL + '/me',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
  };
}
