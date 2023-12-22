import { ReactNode, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_LOGIN, USER_POST } from './api';

interface UserData {
  name?: string;
  email: string;
  password: string;
}

// type UserDataLogin = Omit<UserData, 'name'>;

interface UserContextType {
  user: UserData;
  setUser: React.Dispatch<React.SetStateAction<UserData>>;
  navigate?: () => void;
  // login: UserDataLogin;
  // setLogin: React.Dispatch<React.SetStateAction<UserDataLogin>>;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  createUser: () => void;
  userLogin: (email: string, password: string) => Promise<void>;
}

interface UserContextComponent {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider: React.FC<UserContextComponent> = ({ children }) => {
  const [user, setUser] = useState<UserData>({
    email: '',
    password: '',
  });

  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  async function createUser() {
    if (!userData.name || !userData.email || !userData.password) {
      alert('Preencha os campos!');
      return;
    }
    try {
      const { url, options } = USER_POST(userData);

      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        alert(`${data.error}`);
      } else {
        setUserData(data);
        navigate('/');
      }
    } catch (error) {
      alert(`${error}`);
    }
  }

  async function userLogin(email: string, password: string) {
    try {
      console.log('chegou aqui');

      const { url, options } = USER_LOGIN({ email, password });

      const response = await fetch(url, options);
      const dataUser = await response.json();

      if (!response.ok) {
        alert(`${dataUser.error}`);
        return;
      }

      setUser({
        email: dataUser.email,
        password: dataUser.password,
      });

      localStorage.setItem('token', dataUser.token);

      navigate('/user');
    } catch (err) {
      alert('error');
    }
  }

  const contextValue: UserContextType = {
    user,
    setUser,
    userData,
    setUserData,
    createUser,
    userLogin,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
