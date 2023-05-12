import { Fragment, Suspense, useContext } from 'react';
import { AuthContext } from '../../context/RootRouter';
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
   const { isAuthenticated } = useContext(AuthContext);

   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
