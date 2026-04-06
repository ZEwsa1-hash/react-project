import { ROUTES } from '@/constants/routes';
import { useAuthContext } from '@/contexts/auth-context';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const context = useAuthContext();
  return context?.isLogged ? <Outlet /> : <Navigate to={ROUTES.login} replace />;
};
