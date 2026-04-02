import { ROUTES } from '@/constants/routes';
import { useAuthContext } from '@/contexts/auth-context';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const { isLogged } = useAuthContext() ?? {};
  return isLogged ? <Outlet /> : <Navigate to={ROUTES.login} replace />;
};
