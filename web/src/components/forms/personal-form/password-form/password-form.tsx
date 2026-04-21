import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import s from './password-form.module.css';
import { InputPassword } from '../../../ui/input/input-password/input-password';
import { Button } from '../../../ui/button/button';
import {
  IResetPasswordFormSchema,
  resetPasswordFormSchema,
} from '../../../../validations/password-form-schema';
import React from 'react';
import * as Modal from '../../../ui/modal/modal';
import { useUpdateUser } from '../../../../services/user';
import { toast } from 'sonner';
import { XIcon } from 'lucide-react';

interface IPasswordFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PasswordForm = ({ setIsOpen }: IPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const updateUser = useUpdateUser();

  const onSubmit = async (data: IResetPasswordFormSchema) => {
    try {
      updateUser.mutateAsync(
        {
          password: data.password,
        },
        {
          onSuccess: async () => {
            // await refreshUser();
            toast.success('Senha atualizada com sucesso!');
            setIsOpen(false);
          },
        },
      );
    } catch {}
  };

  return (
    <Modal.Root>
      <Modal.Header>
        <Modal.Title>Alterar senha</Modal.Title>
        <Modal.ButtonClose
          classNameCustom={s.btn__close}
          onClose={() => setIsOpen(false)}
        >
          <XIcon size={20} color="#302d28" />
        </Modal.ButtonClose>
      </Modal.Header>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <InputPassword
          label="Digite nova senha"
          placeholder="Digite sua nova senha"
          maxLength={6}
          {...register('password')}
          error={errors?.password}
        />

        <InputPassword
          label="Confirme sua senha"
          placeholder="Confirme sua senha"
          maxLength={6}
          {...register('confirmPassword')}
          error={errors?.confirmPassword}
        />

        <Button className={s.btn__submit} variant="default" type="submit">
          {updateUser.isPending ? 'Alterando...' : 'Alterar senha'}
        </Button>
      </form>
    </Modal.Root>
  );
};
