import { ReactNode, createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_LOGIN, USER_REGISTER } from './api';
import { toast } from 'react-toastify';

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface UserContextType {
  navigate?: () => void;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  createUser: () => Promise<void>;
  userLogin: (email: string, password: string) => Promise<void>;
  userLogout: () => void;
}

interface UserContextComponent {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider: React.FC<UserContextComponent> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('user');

    if (storedUsername) {
      setUserData((prevData) => ({
        ...(prevData || {}),
        name: storedUsername,
      }));
    }
  }, []);

  async function createUser() {
    if (!userData.name || !userData.email || !userData.password) {
      toast.warn('Preencha os campos!');
      return;
    }
    try {
      const { url, options } = USER_REGISTER(userData);

      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        toast.error(`${data.error}`);
      } else {
        setUserData(data);
        toast.success('Usuário criado com sucesso');
        navigate('/');
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  async function userLogin(email: string, password: string) {
    try {
      const { url, options } = USER_LOGIN({ email, password });

      const response = await fetch(url, options);
      const dataUser = await response.json();

      if (!response.ok) {
        toast.error(`${dataUser.error}`);
        return;
      }

      setUserData({
        name: dataUser.name,
        email: dataUser.email,
        password: dataUser.password,
      });

      localStorage.setItem('user', dataUser.name);
      localStorage.setItem('token', dataUser.token);

      navigate('/user');
    } catch (err) {
      toast.error('error');
    }
  }

  function userLogout() {
    setUserData({
      name: '',
      email: '',
      password: '',
    });

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/');
  }

  const contextValue: UserContextType = {
    userData,
    setUserData,
    createUser,
    userLogin,
    userLogout,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
