import { Link } from 'react-router-dom';
import s from './not-found.module.css';
import error from '../../assets/error.svg';
import { Head } from '../head';

export const NotFound = () => {
  return (
    <>
      <Head title="Página não encontrada" />

      <section className={s.not__found__wrapper}>
        <div>
          <img className={s.error__logo} src={error} alt="Error 404" />
        </div>

        <h1 className={s.title}>
          Deu ruim... Não criei essa funcionalidade 😗
        </h1>
        <Link className={s.link} to="/">
          Voltar para tela de login
        </Link>
      </section>
    </>
  );
};
