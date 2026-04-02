import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import type { User } from '@/types';
import { LSService } from '@/services/ls/local-storage';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const API_URL = 'http://localhost:8082/api/login';

type Context = {
  user: User | null;
  isLogged: boolean;
  login: (data: { login: string; pass: string }) => Promise<User>;
  logout: () => void;
};

type APIResponse<T> = { data: T };

const userStorage = new LSService<User>('user');

export const AuthContext = createContext<Context | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(() => userStorage.get());
  const navigate = useNavigate();

  const login = useCallback<Context['login']>(async (data) => {
    const { login, pass } = data;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, pass: Number(pass) }),
    });

    if (!response.ok) {
      throw new Error('Invalid login or password');
    }

    const payload = (await response.json()) as APIResponse<User>;
    setUser(payload.data);
    userStorage.set(payload.data);

    return payload.data;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    userStorage.remove();
    navigate(ROUTES.login);
  }, [navigate]);

  const data = useMemo<Context>(
    () => ({ user, login, logout, isLogged: !!user }),
    [login, logout, user],
  );

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): Context | null {
  const context = useContext(AuthContext);
  return context;
}
