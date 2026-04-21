import { ChevronLeftIcon } from 'lucide-react';
import { Button } from '../../../components/ui/button/button';
import { IStep } from '../home';
import s from './forgot-password.module.css';
import { ForgotPasswordForm } from '../../../components/forms/forgot-password-form/forgot-password-form';

interface IForgotPasswordProps {
  setStep: React.Dispatch<React.SetStateAction<IStep>>;
}
export const ForgotPassword = ({ setStep }: IForgotPasswordProps) => {
  return (
    <>
      <div className={s.forgot__password__header}>
        <Button
          className={s.btn__back}
          variant="ghost"
          onClick={() => setStep('login')}
        >
          <ChevronLeftIcon size={24} color="#302d28" />
        </Button>
        <h1 className={s.title}>Esqueci a senha</h1>
      </div>

      <p className={s.description}>
        Preencha o campo abaixo com seu e-mail e enviaremos um link para
        redefinir sua senha.
      </p>

      <ForgotPasswordForm setStep={setStep} />
    </>
  );
};
