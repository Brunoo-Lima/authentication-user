import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  IUpdateFormSchema,
  updateFormSchema,
} from '../../../validations/register-form-schema';
import * as Input from '../../ui/input/input';
import { Button } from '../../ui/button/button';
import s from './personal-form.module.css';
import { useAuth } from '../../../hooks/use-auth';
import { useEffect } from 'react';
import { useUpdateUser } from '../../../services/user';
import { toast } from 'sonner';

export const PersonalForm = () => {
  const { user, refreshUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUpdateFormSchema>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const onSubmit = (data: Partial<IUpdateFormSchema>) => {
    updateUser.mutate(
      {
        name: data.name,
        email: data.email,
      },
      {
        onSuccess: async () => {
          await refreshUser();
          toast.success('Usuário atualizado com sucesso!');
        },
      },
    );
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Input.Root>
        <Input.Label>Nome</Input.Label>
        <Input.FormField
          type="text"
          placeholder="Digite seu nome"
          {...register('name')}
        />
        <Input.ErrorMessage message={errors?.name?.message} />
      </Input.Root>

      <Input.Root>
        <Input.Label>E-mail</Input.Label>
        <Input.FormField
          type="email"
          placeholder="Digite seu e-mail"
          {...register('email')}
        />
        <Input.ErrorMessage message={errors?.email?.message} />
      </Input.Root>

      <Button className={s.btn__submit} type="submit" variant="default">
        {updateUser.isPending ? 'Salvando...' : 'Salvar alterações'}
      </Button>
    </form>
  );
};
