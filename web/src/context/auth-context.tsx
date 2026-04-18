import { ReactNode, createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface IUserData {
  id: string;
  name: string;
  email: string;
}

interface IAuthContextProps {
  user: IUserData | null;
  login: (email: string, _password: string) => Promise<void>;
  logOut: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        const userParsed = JSON.parse(storedUser) as IUserData;

        setUser(userParsed);
      } catch {
        setUser({
          id: '',
          name: storedUser,
          email: '',
        });
      }
    }

    setIsLoading(false);
  }, []);

  // async function createUser() {
  //   if (!userData.name || !userData.email || !userData.password) {
  //     toast.warn('Preencha os campos!');
  //     return;
  //   }
  //   try {
  //     const { url, options } = USER_REGISTER(userData);

  //     const response = await fetch(url, options);
  //     const data = await response.json();

  //     if (!response.ok) {
  //       toast.error(`${data.error}`);
  //     } else {
  //       setUserData(data);
  //       toast.success('Usuário criado com sucesso');
  //       navigate('/');
  //     }
  //   } catch (error) {
  //     toast.error(`${error}`);
  //   }
  // }

  async function login(email: string, _password: string) {
    setIsLoading(true);

    try {
      const fakeUser = {
        id: '1',
        name: 'João',
        email,
      };

      setUser(fakeUser);

      localStorage.setItem('user', JSON.stringify(fakeUser));
      localStorage.setItem('token', '123');

      // if (!response.ok) {
      //   toast.error(`${dataUser.error}`);
      //   return;
      // }

      // setUser({
      //   id: dataUser.id,
      //   name: dataUser.name,
      //   email: dataUser.email,
      // });

      // localStorage.setItem('user', dataUser.name);
      // localStorage.setItem('token', dataUser.token);

      navigate('/dash');
    } catch (error) {
      console.error(error);
      toast.error('error');
    } finally {
      setIsLoading(false);
    }
  }

  function logOut() {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/');
  }

  const contextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
