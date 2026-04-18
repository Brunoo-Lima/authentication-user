import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  IResetPasswordFormSchema,
  resetPasswordFormSchema,
} from '../../../validations/password-form-schema';
import s from './reset-password-form.module.css';
import { InputPassword } from '../../ui/input/input-password/input-password';
import { Button } from '../../ui/button/button';

export const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
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
        Enviar
      </Button>
    </form>
  );
};
