import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/not-found/not-found';
import { AuthProvider } from './context/auth-context';
import { User } from './pages/user/user';
import { Home } from './pages/home/home';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
