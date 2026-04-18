import { useMutation } from '@tanstack/react-query';
import { IUser, IUserLogin } from '../@types/IUser';
import api from './api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const signup = async (user: IUser): Promise<IUserLogin> => {
  const { data } = await api.post<IUserLogin>('/users', user);

  return data;
};

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: (user: IUser) => {
      return signup(user);
    },
    onSuccess: (createdUser) => {
      const { accessToken, refreshToken } = createdUser.tokens;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      toast.success(
        'Usuário criado com sucesso! Verifique seu email antes de fazer login!',
      );
    },
    onError: (error: AxiosError) => {
      const message = error.message || 'Erro ao criar usuário.';
      toast.error(message);
    },
  });
};
