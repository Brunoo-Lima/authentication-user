import { useMutation } from '@tanstack/react-query';
import api from './api';
import { IUser } from '../@types/IUser';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const getUser = async () => {
  const { data } = await api.get(`/users/me`);

  return data;
};

export const updateUser = async (user: Partial<IUser>) => {
  const { data } = await api.patch(`/users/me`, user);

  return data;
};

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ['users'],
    mutationFn: (user: Partial<IUser>) => {
      return updateUser(user);
    },
    onError: (error: AxiosError) => {
      const message = error.message || 'Erro ao atualizar usuário.';
      toast.error(message);
    },
  });
};

const deleteUser = async (id: string) => {
  const { data } = await api.delete(`/users/me`, {
    data: {
      id,
    },
  });

  return data;
};

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: ['users'],
    mutationFn: (id: string) => {
      return deleteUser(id);
    },
    onError: (error: AxiosError) => {
      const message = error.message || 'Erro ao deletar usuário.';
      toast.error(message);
    },
  });
};
