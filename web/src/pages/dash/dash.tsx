import { Head } from '../../components/head';
import { Button } from '../../components/ui/button/button';
import { PageContainer } from '../../components/ui/page-container/page-container';
import { useAuth } from '../../hooks/use-auth';
import s from './dash.module.css';

export const Dash = () => {
  const { logOut } = useAuth();

  return (
    <>
      <Head title="Página inicial" />

      <PageContainer>
        <h1 className={s.title}>
          Olá,
          <span className={s.user}> Nome do usuario</span>
        </h1>

        <Button type="button" onClick={logOut}>
          Sair
        </Button>
      </PageContainer>
    </>
  );
};
