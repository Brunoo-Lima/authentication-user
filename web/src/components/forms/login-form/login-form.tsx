import s from './login-form.module.css';
import * as Input from '../../ui/input/input';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/button/button';
import { InputPassword } from '../../ui/input/input-password/input-password';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ILoginFormSchema,
  loginFormSchema,
} from '../../../validations/login-form-schema';

export const LoginForm = () => {
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
    console.log(data);
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
        maxLength={8}
        {...register('password')}
        error={errors?.password}
      />

      <div className={s.containerForgetPass}>
        <Link to="/*" className={s.forgetPass}>
          Esqueceu a senha?
        </Link>
      </div>

      <Button type="submit">Entrar</Button>

      <p className={s.register}>
        Não possui conta? <Link to="/register">Registrar</Link>
      </p>
    </form>
  );
};
