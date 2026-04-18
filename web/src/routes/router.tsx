import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home/home';
import { PrivateRoute } from '../providers/private-route';
import { DefaultLayout } from '../components/default-layout/default-layout';
import { NotFound } from '../components/not-found/not-found';
import { Profile } from '../pages/profile/profile';
import { Dash } from '../pages/dash/dash';

export function AppRouter() {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/" element={<Home />} />

      {/* Rotas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route element={<DefaultLayout />}>
          <Route path="/dash" element={<Dash />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}
