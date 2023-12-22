import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import error from '../../../assets/error.svg';
import Head from './Head';

const NotFound = () => {
  return (
    <section className={styles.container}>
      <Head title="Página não encontrada" />
      <div>
        <img className={styles.errorLogo} src={error} alt="Error 404" />
      </div>

      <h1 className={styles.title}>
        Deu ruim... Não criei essa funcionalidade 😗
      </h1>
      <Link className={styles.link} to="/">
        Voltar para tela de login
      </Link>
    </section>
  );
};

export default NotFound;
