import { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonComponent {
  children: ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
}

const Button = ({ children, onClick, type, ...rest }: ButtonComponent) => {
  return (
    <button className={styles.btn} type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
