import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home/home';
import { PrivateRoute } from '../providers/private-route';
import { DefaultLayout } from '../components/default-layout/default-layout';
import { User } from '../pages/user/user';
import { NotFound } from '../components/not-found/not-found';

export function AppRouter() {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/" element={<Home />} />

      {/* Rotas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route element={<DefaultLayout />}>
          <Route path="/user" element={<User />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}
