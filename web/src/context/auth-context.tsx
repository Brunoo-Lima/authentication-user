import { ReactNode, createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getUser } from '../services/user';
import { IUserLogin } from '../@types/IUser';
import { useUserLogin } from '../services/login';

interface IAuthContextProps {
  user: IUserLogin | null;
  loginService: (email: string, password: string) => Promise<void>;
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
  const [user, setUser] = useState<IUserLogin | null>(null);
  const navigate = useNavigate();
  const login = useUserLogin();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken || !refreshToken) {
          setIsLoading(false);
          return;
        }

        const user = await getUser(accessToken);

        if (user) {
          setUser(user);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getUserData();
  }, []);

  async function loginService(email: string, password: string) {
    setIsLoading(true);

    try {
      const userData = await login.mutateAsync({ email, password });

      localStorage.setItem('accessToken', userData.tokens.accessToken);
      localStorage.setItem('refreshToken', userData.tokens.refreshToken);

      setUser(userData);
      navigate('/dash');
    } catch (error) {
      toast.error('Erro ao fazer login.');
    } finally {
      setIsLoading(false);
    }
  }

  function logOut() {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    navigate('/');
  }

  const contextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    loginService,
    logOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
