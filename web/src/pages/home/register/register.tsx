import { ChevronLeftIcon } from 'lucide-react';
import { Button } from '../../../components/ui/button/button';
import s from './register.module.css';
import { RegisterForm } from '../../../components/forms/register-form/register-form';
import { IStep } from '../home';

interface IRegisterProps {
  setStep: React.Dispatch<React.SetStateAction<IStep>>;
}

export const Register = ({ setStep }: IRegisterProps) => {
  return (
    <>
      <div className={s.register__header}>
        <Button
          className={s.btn__back}
          variant="ghost"
          onClick={() => setStep('login')}
        >
          <ChevronLeftIcon size={24} color="#302d28" />
        </Button>

        <h1 className={s.title}>Dados Pessoais</h1>
      </div>
      <RegisterForm />
    </>
  );
};
