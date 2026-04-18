import { NavLink, useLocation } from 'react-router-dom';
import s from './header.module.css';

export const Header = () => {
  const location = useLocation();

  return (
    <header className={s.header__wrapper}>
      <strong className={s.logo}>Logo</strong>

      <nav className={s.nav}>
        <NavLink
          to="/dash"
          className={`${location.pathname === '/dash' ? s.active : ''}`}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/me"
          className={`${location.pathname === '/me' ? s.active : ''}`}
        >
          Meu perfil
        </NavLink>
      </nav>
    </header>
  );
};
