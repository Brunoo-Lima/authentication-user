import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/screens/register/Register';
import NotFound from './components/not-found/not-found';
import { AuthProvider } from './context/auth-context';
import { Login } from './pages/login/login';
import { User } from './components/screens/user/user';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
