import { useSearchParams } from 'react-router-dom';
import { ResetPasswordForm } from '../../components/forms/reset-password-form/reset-password-form';
import { Head } from '../../components/head';
import s from './reset-password.module.css';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <>
      <Head title="Resetar senha" />

      <section className={s.reset__password__wrapper}>
        <div className={s.card__wrapper}>
          <h1>Resetar senha</h1>
          <ResetPasswordForm token={token} />
        </div>
      </section>
    </>
  );
};
