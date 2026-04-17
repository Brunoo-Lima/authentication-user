import s from './login.module.css';
import loginImg from '../../../assets/login.svg';

import { Head } from '../../components/head';
import { LoginForm } from '../../components/forms/login-form/login-form';

export const Login = () => {
  return (
    <section className={s.container}>
      <Head title="Login" />
      <div className={s.sideLeft}>
        <img className={s.imgLogin} src={loginImg} alt="Imagem de login" />
      </div>

      <div className={s.sideRight}>
        <h1 className={s.title}>Entrar na conta</h1>

        <LoginForm />
      </div>
    </section>
  );
};
