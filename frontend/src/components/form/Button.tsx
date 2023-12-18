import { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonComponent {
  children: ReactNode;
  action?: () => void;
}

const Button = ({ children, action }: ButtonComponent) => {
  return (
    <button className={styles.btn} onClick={action}>
      {children}
    </button>
  );
};

export default Button;
