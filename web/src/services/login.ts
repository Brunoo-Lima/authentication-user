import { useMutation } from '@tanstack/react-query';
import api from './api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
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
    onSuccess: (user) => {
      localStorage.setItem('accessToken', user.tokens.accessToken);
      localStorage.setItem('refreshToken', user.tokens.refreshToken);

      toast.success('Login realizado com sucesso!');
    },
    onError: (error: AxiosError) => {
      const message = error.message || 'Erro ao fazer login.';
      toast.error(message);
    },
  });
};
