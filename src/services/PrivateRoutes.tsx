import { Navigate, Outlet } from 'react-router-dom';

interface IPrivateRouteProps {
  isAuthenticated: boolean;
}

export function PrivateRoutes({ isAuthenticated }: IPrivateRouteProps) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
