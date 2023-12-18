import React from 'react';
import styles from './Login.module.css';
import login from '../../assets/login.svg';
import Input from '../form/Input';
import Button from '../form/Button';

const Login = () => {
  return (
    <section className={styles.container}>
      <div className={styles.sideLeft}>
        <img className={styles.imgLogin} src={login} alt="Imagem de login" />
      </div>

      <div className={styles.sideRight}>
        <h1 className={styles.title}>Entrar na conta</h1>

        <form className={styles.form}>
          <div className={styles.inputs}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <Input type="email" name="email" placeholder="Digite seu email" />
          </div>

          <div className={styles.inputs}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <Input
              type="password"
              name="password"
              placeholder="Digite sua senha"
            />
          </div>
          <a href="#" className={styles.forgetPass}>
            Esqueceu a senha?
          </a>

          <Button>Entrar</Button>

          <p className={styles.register}>
            Não possui conta? <a href="#">Registrar</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
