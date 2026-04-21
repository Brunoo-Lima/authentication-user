import { useState } from 'react';
import { Button } from '../../../components/ui/button/button';
import s from './button-delete.module.css';
import { ModalConfirm } from './modal-confirm/modal-confirm';

export const ButtonDelete = () => {
  const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);

  return (
    <>
      <Button
        className={s.btn__delete}
        type="button"
        variant="cancel"
        onClick={() => setIsConfirmDelete(true)}
      >
        Deletar conta
      </Button>

      {isConfirmDelete && (
        <ModalConfirm setIsConfirmDelete={setIsConfirmDelete} />
      )}
    </>
  );
};
