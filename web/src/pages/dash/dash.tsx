import { Head } from '../../components/head';
import { Button } from '../../components/ui/button/button';
import { PageContainer } from '../../components/ui/page-container/page-container';
import s from './dash.module.css';

export const Dash = () => {
  return (
    <>
      <Head title="Página inicial" />

      <PageContainer>
        <h1 className={s.title}>
          Olá,
          <span className={s.user}> Nome do usuario</span>
        </h1>

        <Button>Sair</Button>
      </PageContainer>
    </>
  );
};
