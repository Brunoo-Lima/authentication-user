import s from './home.module.css';
import loginImg from '../../assets/login.svg';

import { Head } from '../../components/head';

import { useState } from 'react';

import { Register } from './register/register';
import { Login } from './login/login';

export type IStep = 'login' | 'register' | 'forgot-password';
export const Home = () => {
  const [step, setStep] = useState<IStep>('login');

  return (
    <>
      <Head title="Home" />

      <section className={s.login_wrapper}>
        <div className={s.background__wrapper}>
          <img
            className={s.background__login}
            src={loginImg}
            alt="Imagem de login"
          />
        </div>

        <div className={s.form__wrapper}>
          {step === 'login' && <Login setStep={setStep} />}
          {step === 'register' && <Register setStep={setStep} />}
        </div>
      </section>
    </>
  );
};
