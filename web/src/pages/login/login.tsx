import s from './login.module.css';
import loginImg from '../../assets/login.svg';

import { Head } from '../../components/head';
import { LoginForm } from '../../components/forms/login-form/login-form';

export const Login = () => {
  return (
    <>
      <Head title="Login" />

      <section className={s.login_wrapper}>
        <div className={s.background__wrapper}>
          <img
            className={s.background__login}
            src={loginImg}
            alt="Imagem de login"
          />
        </div>

        <div className={s.form__wrapper}>
          <h1 className={s.title}>Entrar na conta</h1>
          <p className={s.description}>
            Preencha os campos abaixo para entrar na sua conta
          </p>
          <LoginForm />
        </div>
      </section>
    </>
  );
};
