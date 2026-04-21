import { useMutation } from '@tanstack/react-query';
import api from './api';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const forgotPassword = async (email: string) => {
  const { data } = await api.post('/auth/forgot-password', { email });

  return data;
};

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: (email: string) => {
      return forgotPassword(email);
    },
    onError: (error: AxiosError) => {
      const message = error.message || 'Erro ao enviar email.';
      toast.error(message);
    },
  });
};
