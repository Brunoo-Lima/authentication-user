import s from './profile.module.css';
import { Head } from '../../components/head';
import { PersonalForm } from '../../components/forms/personal-form/personal-form';
import { Button } from '../../components/ui/button/button';

export const Profile = () => {
  return (
    <>
      <Head title="Meu perfil" />

      <section className={s.profile__wrapper}>
        <div className={s.card__wrapper}>
          <strong>Informações pessoais</strong>
          <PersonalForm />
        </div>

        <div className={s.card__wrapper}>
          <strong>Deletar essa conta?</strong>
          <p>Ao deletar essa conta, perderemos todos os seus dados.</p>
          <Button className={s.btn__delete} type="button" variant="cancel">
            Deletar conta
          </Button>
        </div>
      </section>
    </>
  );
};
