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
  refreshUser: () => Promise<void>;
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

  const refreshUser = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      setUser(null);
      return;
    }

    const userData = await getUser();

    if (userData) {
      setUser((previousUser) => {
        if (!previousUser) {
          return userData;
        }

        return {
          ...previousUser,
          ...userData,
        };
      });
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        await refreshUser();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
  }, []);

  async function loginService(email: string, password: string) {
    setIsLoading(true);

    try {
      await login.mutateAsync(
        { email, password },
        {
          onSuccess: (user) => {
            localStorage.setItem('accessToken', user.tokens.accessToken);
            localStorage.setItem('refreshToken', user.tokens.refreshToken);

            setUser(user);
            toast.success('Login realizado com sucesso!');
            navigate('/dash');
          },
        },
      );
    } catch (error: any) {
      const message = error.message || 'Erro ao fazer login.';
      toast.error(message);
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
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
