import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputComponent extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
}

const Input = ({ type, ...rest }: InputComponent) => {
  return <input className={styles.input} type={type} {...rest} />;
};

export default Input;
