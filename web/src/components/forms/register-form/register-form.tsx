import s from './register-form.module.css';
import * as Input from '../../ui/input/input';
import { InputPassword } from '../../ui/input/input-password/input-password';
import { Button } from '../../ui/button/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IRegisterFormSchema,
  registerFormSchema,
} from '../../../validations/register-form-schema';
import { IUser } from '../../../@types/IUser';
import { useCreateUser } from '../../../services/signup';
import { IStep } from '../../../pages/home/home';

interface IRegisterFormProps {
  setStep: React.Dispatch<React.SetStateAction<IStep>>;
}

export const RegisterForm = ({ setStep }: IRegisterFormProps) => {
  const createUser = useCreateUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IRegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: IUser) => {
    try {
      await createUser.mutateAsync(data);
      setStep('login');
      reset();
    } catch {}
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

      <InputPassword
        label="Senha"
        placeholder="Digite sua senha"
        maxLength={6}
        {...register('password')}
        error={errors?.password}
      />

      <Button type="submit" className={s.btn} disabled={createUser.isPending}>
        {createUser.isPending ? 'Cadastrando...' : 'Cadastrar'}
      </Button>
    </form>
  );
};
