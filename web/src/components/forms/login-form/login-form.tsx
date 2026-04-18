import s from './login-form.module.css';
import * as Input from '../../ui/input/input';
import { Button } from '../../ui/button/button';
import { InputPassword } from '../../ui/input/input-password/input-password';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ILoginFormSchema,
  loginFormSchema,
} from '../../../validations/login-form-schema';
import React from 'react';
import { IStep } from '../../../pages/home/home';
import { useAuth } from '../../../hooks/use-auth';

interface ILoginFormProps {
  setStep: React.Dispatch<React.SetStateAction<IStep>>;
}
export const LoginForm = ({ setStep }: ILoginFormProps) => {
  const { loginService, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: any) => {
    loginService(data.email, data.password);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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

      <div className={s.forgot__password__container}>
        <span
          className={s.forgot__password}
          onClick={() => setStep('forgot-password')}
        >
          Esqueceu a senha?
        </span>
      </div>

      <Button type="submit" className={s.button__submit} variant="default">
        {isLoading ? 'Entrando...' : 'Entrar'}
      </Button>

      <p className={s.register}>
        Não possui conta?{' '}
        <span onClick={() => setStep('register')}>Registrar</span>
      </p>
    </form>
  );
};
