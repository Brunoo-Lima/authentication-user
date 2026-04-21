import { useState } from 'react';
import { PasswordForm } from '../../../components/forms/personal-form/password-form/password-form';
import { Button } from '../../../components/ui/button/button';
import s from './button-password.module.css';

export const ButtonPassword = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button className={s.btn} variant="ghost" onClick={() => setIsOpen(true)}>
        Alterar senha
      </Button>

      {isOpen && <PasswordForm setIsOpen={setIsOpen} />}
    </>
  );
};
