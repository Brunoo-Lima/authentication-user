import { useState } from 'react';
import styles from './Register.module.css';
import Input from './../../form/Input';
import Button from './../../form/Button';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function createUser() {
    if (name == '' || email == '' || password == '') {
      alert('Verifique os campos');
    } else {
      alert('Usuário criado com sucesso');
      navigate('/');
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Dados Pessoais</h1>

        <form
          className={styles.formRegister}
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label htmlFor="name">Nome</label>
            <Input
              type="text"
              name="name"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Senha</label>
            <Input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.btnRegister}>
            <Button onClick={createUser}>Criar Usuário</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
