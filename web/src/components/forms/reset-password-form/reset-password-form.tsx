import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  IResetPasswordFormSchema,
  resetPasswordFormSchema,
} from '../../../validations/password-form-schema';
import s from './reset-password-form.module.css';
import { InputPassword } from '../../ui/input/input-password/input-password';
import { Button } from '../../ui/button/button';
import { useResetPassword } from '../../../services/password';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface IResetPasswordFormProps {
  token: string | null;
}

export const ResetPasswordForm = ({ token }: IResetPasswordFormProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
  });
  const resetPassword = useResetPassword();

  const onSubmit = async (data: IResetPasswordFormSchema) => {
    try {
      await resetPassword.mutateAsync(
        { token: token || '', password: data.password },
        {
          onSuccess: () => {
            toast.success('Senha atualizada com sucesso!');
            navigate('/');
          },
        },
      );
    } catch {}
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
        {resetPassword.isPending ? 'Atualizando...' : 'Atualizar'}
      </Button>
    </form>
  );
};
