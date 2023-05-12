import { Fragment, Suspense, useContext } from 'react';
import { AuthContext } from '../../context/RootRouter';
import { Navigate } from 'react-router-dom';
import { SignUp } from '../../pages/SignUp';

export function SignUpRoute() {
   const { isAuthenticated } = useContext(AuthContext);

   return isAuthenticated ? <Navigate to="/" /> : <SignUp />;
}
