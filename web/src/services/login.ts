import { useMutation } from '@tanstack/react-query';
import api from './api';
import { IUserLogin } from '../@types/IUser';

export const login = async (
  email: string,
  password: string,
): Promise<IUserLogin> => {
  const { data } = await api.post<IUserLogin>('/auth', {
    email,
    password,
  });

  return data;
};

export const useUserLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (user: { email: string; password: string }) => {
      return login(user.email, user.password);
    },
  });
};
