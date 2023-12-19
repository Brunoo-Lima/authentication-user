import { useState } from 'react';
import styles from './Login.module.css';
import login from '../../../assets/login.svg';
import Input from '../../form/Input';
import Button from '../../form/Button';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  function handleLogin() {
    if (email == '' || password == '') {
      alert('Preencha os campos');
    } else {
      navigate('/user');
    }
  }

  // async function loginUser() {
  //   const resp = await fetch('/user/login');
  //   const json = await resp.json();

  //   setUser(json);
  // }

  return (
    <section className={styles.container}>
      <div className={styles.sideLeft}>
        <img className={styles.imgLogin} src={login} alt="Imagem de login" />
      </div>

      <div className={styles.sideRight}>
        <h1 className={styles.title}>Entrar na conta</h1>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <Input
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <Input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to="/*" className={styles.forgetPass}>
            Esqueceu a senha?
          </Link>

          <Button onClick={handleLogin}>Entrar</Button>

          <p className={styles.register}>
            Não possui conta? <Link to="/register">Registrar</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
