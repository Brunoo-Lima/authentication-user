import { FormEvent, useState } from 'react';
import styles from './Register.module.css';
import Input from './../../form/Input';
import Button from './../../form/Button';
import { useNavigate } from 'react-router-dom';

interface RegisterComponent {
  name: string;
  email: string;
  password: string;
}

//TODO: EM ANDAMENTO

const Register = ({ name, email, password }: RegisterComponent) => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  // function createUser() {
  //   if (
  //     userData.name == '' ||
  //     userData.email == '' ||
  //     userData.password == ''
  //   ) {
  //     alert('Verifique os campos');
  //   } else {
  //     alert('Usuário criado com sucesso');
  //     navigate('/');
  //   }
  // }

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData((data) => ({
      ...data,
      [name]: value,
      [email]: value,
      [password]: value,
    }));
  }

  async function createUserNow() {
    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Error');

      const data = await response.json();
      setUserData(data);
      navigate('/');
    } catch (error) {
      console.error(error);
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
              // onChange={(e) => setName(e.target.value)}
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
              // onChange={(e) => setEmail(e.target.value)}
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
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.btnRegister}>
            <Button onClick={createUserNow}>Criar Usuário</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
