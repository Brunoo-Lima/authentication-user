import { useContext } from 'react';
import { UserContext } from '../../../UserContext';
import styles from './User.module.css';

const User = () => {
  const context = useContext(UserContext);
  const { userData } = context!;

  return (
    <div className={styles.container}>
      <h1>
        Olá,
        <span className={styles.user}> {userData.name}!</span>
      </h1>
    </div>
  );
};

export default User;
