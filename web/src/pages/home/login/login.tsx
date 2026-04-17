import s from './login.module.css';

import { LoginForm } from '../../../components/forms/login-form/login-form';
import { IStep } from '../home';

interface ILoginProps {
  setStep: React.Dispatch<React.SetStateAction<IStep>>;
}

export const Login = ({ setStep }: ILoginProps) => {
  return (
    <>
      <h1 className={s.title}>Entrar na conta</h1>
      <p className={s.description}>
        Preencha os campos abaixo para entrar na sua conta
      </p>
      <LoginForm setStep={setStep} />
    </>
  );
};
