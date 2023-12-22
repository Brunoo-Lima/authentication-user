import { useContext } from 'react';
import { UserContext } from '../../../UserContext';
import styles from './User.module.css';
import Button from '../../form/Button';

const User = () => {
  const context = useContext(UserContext);
  const { userData, userLogout } = context!;

  return (
    <div className={styles.container}>
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
