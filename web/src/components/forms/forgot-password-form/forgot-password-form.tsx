import { useForm } from 'react-hook-form';
import s from './forgot-password-form.module.css';
import * as Input from '../../ui/input/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  forgotPasswordFormSchema,
  IForgotPasswordFormSchema,
} from '../../../validations/password-form-schema';
import { Button } from '../../ui/button/button';

export const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
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

      <Button className={s.btn__submit} variant="default" type="submit">
        Enviar
      </Button>
    </form>
  );
};
