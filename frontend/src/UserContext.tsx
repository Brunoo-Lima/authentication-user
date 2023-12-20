import { ReactNode, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_POST } from './api';

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface MyContextType {
  user?: string;
  setUser?: React.Dispatch<React.SetStateAction<string | undefined>>;
  navigate?: () => void;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  createUser: () => void;
}

interface UserContextComponent {
  children: ReactNode;
}

const UserContext = createContext<MyContextType | undefined>(undefined);

//TODO: FALTA FAZER AINDA

const UserProvider: React.FC<UserContextComponent> = ({ children }) => {
  const [user, setUser] = useState<string | undefined>('');
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
  });

  async function createUser() {
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

  const contextValue: MyContextType = {
    user,
    setUser,
    userData,
    setUserData,
    createUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserProvider, UserContext };
