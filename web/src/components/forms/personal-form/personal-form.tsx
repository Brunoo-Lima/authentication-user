import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  IRegisterFormSchema,
  registerFormSchema,
} from '../../../validations/register-form-schema';
import * as Input from '../../ui/input/input';
import { InputPassword } from '../../ui/input/input-password/input-password';
import { Button } from '../../ui/button/button';
import s from './personal-form.module.css';

export const PersonalForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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

      <Button className={s.btn__submit} type="submit" variant="default">
        Salvar alterações
      </Button>
    </form>
  );
};
