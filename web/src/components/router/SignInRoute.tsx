import {
   Fragment,
   ReactNode,
   Suspense,
   useContext,
   useEffect,
   useState,
} from 'react';
import { AuthContext } from '../../context/RootRouter';
import { Navigate } from 'react-router-dom';
import { SignIn } from '../../pages/SignIn';

export function SignInRoute() {
   const { isAuthenticated } = useContext(AuthContext);

   return isAuthenticated ? <Navigate to="/" /> : <SignIn />;
}
