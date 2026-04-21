import { Button } from '../../../../components/ui/button/button';
import * as Modal from '../../../../components/ui/modal/modal';
import { useDeleteUser } from '../../../../services/user';
import s from './modal-confirm.module.css';
import { useAuth } from '../../../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface IModalConfirmProps {
  setIsConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalConfirm = ({ setIsConfirmDelete }: IModalConfirmProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const deleteUser = useDeleteUser();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    try {
      deleteUser.mutateAsync(user.id, {
        onSuccess: () => {
          toast.success('Usuário deletado com sucesso!');
          setIsConfirmDelete(false);
          navigate('/');
        },
      });
    } catch {}
  };

  return (
    <Modal.Root>
      <Modal.Header classNameCustom={s.header}>
        Tem certeza que deseja excluir sua conta?
      </Modal.Header>

      <p>Essa ação não pode ser desfeita!.</p>

      <form className={s.form} onSubmit={onSubmit}>
        <Button variant="ghost" onClick={() => setIsConfirmDelete(false)}>
          Cancelar
        </Button>
        <Button variant="cancel" type="submit">
          Deletar
        </Button>
      </form>
    </Modal.Root>
  );
};
