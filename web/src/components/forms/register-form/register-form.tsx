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

export const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
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

      <Button type="submit" className={s.btn}>
        Criar Usuário
      </Button>
    </form>
  );
};
