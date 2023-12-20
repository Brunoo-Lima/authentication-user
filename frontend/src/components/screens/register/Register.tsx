import { useState } from 'react';
import styles from './Register.module.css';
import Input from './../../form/Input';
import Button from './../../form/Button';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUserData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  async function createUser() {
    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`${data.error}`);
      } else {
        setUserData(data);
        navigate('/');
      }
    } catch (error) {
      alert(`${error}`);
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
              value={userData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <Input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={userData.password}
              onChange={handleChange}
            />
          </div>

          <div className={styles.btnRegister}>
            <Button type="submit" onClick={createUser}>
              Criar Usuário
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
