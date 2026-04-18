import s from './user.module.css';
import { Button } from '../../components/ui/button/button';
import { Head } from '../../components/head';

export const User = () => {
  return (
    <>
      <Head title="Minha conta" />

      <section className={s.user__wrapper}>
        <h1>
          Olá,
          <span className={s.user}>Nome do usuario</span>
        </h1>

        <Button>Sair</Button>
      </section>
    </>
  );
};
