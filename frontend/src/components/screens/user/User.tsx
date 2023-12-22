import { useContext } from 'react';
import { UserContext } from '../../../UserContext';
import styles from './User.module.css';
import Button from '../../form/Button';
import Head from './../helper/Head';

const User = () => {
  const context = useContext(UserContext);
  const { userData, userLogout } = context!;

  return (
    <div className={styles.container}>
      <Head title="Minha conta" />
      <h1>
        Olá,
        <span className={styles.user}> {userData.name}!</span>
      </h1>

      <div className={styles.btnContainer}>
        <Button onClick={userLogout}>Sair</Button>
      </div>
    </div>
  );
};

export default User;
