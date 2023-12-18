import { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonComponent {
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick }: ButtonComponent) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
