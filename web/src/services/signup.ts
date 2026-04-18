import { useMutation } from '@tanstack/react-query';
import { IUser } from '../@types/IUser';
import api from './api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const signup = async (user: IUser) => {
  const { data } = await api.post('/api/users', user);
  return data;
};

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: (user: IUser) => {
      return signup(user);
    },
    onSuccess: () => {
      toast.success('Usuário criado com sucesso!');
    },
    onError: (error: AxiosError) => {
      const message = error.message || 'Erro ao criar usuário.';
      toast.error(message);
    },
  });
};
