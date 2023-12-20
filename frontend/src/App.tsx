import Login from './components/screens/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/screens/register/Register';
import NotFound from './components/screens/helper/NotFound';
import User from './components/screens/user/User';
import { UserProvider } from './UserContext';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
