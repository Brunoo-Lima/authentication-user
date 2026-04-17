import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';

import s from './input.module.css';

interface InputPasswordProps {
  label?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerClassName?: string;
  inputClassName?: string;
  value?: string;
  error?: FieldError;
  maxLength?: number;
}

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  (
    {
      label,
      placeholder,
      onChange,
      containerClassName,
      inputClassName,
      value,
      error,
      maxLength,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <div className={`${s.input__container} ${containerClassName ?? ''}`}>
        {label && (
          <label className={s.label} htmlFor={label}>
            {label}
          </label>
        )}

        <div className={s.input__wrapper}>
          <input
            ref={ref}
            id={label}
            className={`${s.input__field} ${inputClassName ?? ''}`}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            maxLength={maxLength}
            {...rest}
          />

          {showPassword ? (
            <EyeIcon
              size={24}
              color="#A4A7AB"
              className={s.icon}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeOffIcon
              size={24}
              color="#A4A7AB"
              className={s.icon}
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {error && <small className={s.error__text}>{error.message}</small>}
      </div>
    );
  },
);

InputPassword.displayName = 'InputPassword';
