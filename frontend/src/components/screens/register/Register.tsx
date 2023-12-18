import React from 'react';
import styles from './Register.module.css';
import Input from './../../form/Input';
import Button from './../../form/Button';

const Register = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Dados Pessoais</h1>
        <form className={styles.formRegister}>
          <div>
            <label htmlFor="name">Nome</label>
            <Input type="text" name="name" placeholder="Digite seu nome" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Input type="email" name="email" placeholder="Digite seu email" />
          </div>

          <div>
            <label htmlFor="password">Senha</label>
            <Input
              type="password"
              name="password"
              placeholder="Digite sua senha"
            />
          </div>

          <div className={styles.btnRegister}>
            <Button>Criar Usuário</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
