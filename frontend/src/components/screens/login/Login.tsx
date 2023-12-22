import { useContext, useState } from 'react';
import styles from './Login.module.css';
import loginImg from '../../../assets/login.svg';
import Input from '../../form/Input';
import Button from '../../form/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../UserContext';

const Login = () => {
  const context = useContext(UserContext);

  const { userLogin } = context!;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (email == '' || password == '') {
      alert('Preencha os campos!');
      return;
    }
    try {
      await userLogin(email, password);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.sideLeft}>
        <img className={styles.imgLogin} src={loginImg} alt="Imagem de login" />
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
              required
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
              required
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
