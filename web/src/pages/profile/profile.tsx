import s from './profile.module.css';
import { Head } from '../../components/head';
import { PersonalForm } from '../../components/forms/personal-form/personal-form';
import { PageContainer } from '../../components/ui/page-container/page-container';
import { ButtonPassword } from './button-password/button-password';
import { ButtonDelete } from './button-delete/button-delete';

export const Profile = () => {
  return (
    <>
      <Head title="Meu perfil" />

      <PageContainer>
        <div className={s.card__wrapper}>
          <strong>Informações pessoais</strong>
          <PersonalForm />

          <ButtonPassword />
        </div>

        <div className={s.card__wrapper}>
          <strong>Deletar essa conta?</strong>
          <p>Ao deletar essa conta, perderemos todos os seus dados.</p>

          <ButtonDelete />
        </div>
      </PageContainer>
    </>
  );
};
