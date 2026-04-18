import { Outlet } from 'react-router-dom';
import { Header } from '../header/header';

export const DefaultLayout = () => {
  return (
    <>
      <Header />
      <main className="w-full">
        <Outlet />
      </main>
    </>
  );
};
