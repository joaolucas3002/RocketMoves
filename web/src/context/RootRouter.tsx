import { Outlet, useLoaderData } from 'react-router-dom';
import {
   createContext,
   Dispatch,
   SetStateAction,
   useCallback,
   useEffect,
   useMemo,
   useState,
} from 'react';
import { configFetch } from '../utils/configFetch';
import { baseURL } from '../lib/fetch';

interface Props {
   isAuthenticated?: boolean;
   // setIsAuthenticated?: (params: boolean) => void;
}

export const AuthContext = createContext<Props>({});

export function RootRouter() {
   const data = useLoaderData() as boolean;

   console.log({ data });

   const [isAuthenticated, setIsAuth] = useState<boolean>(data);

   const setIsAuthenticated = useCallback(
      (response: boolean) => {
         setIsAuth(response);
      },
      [data],
   );

   const contextValue = useMemo(
      () => ({
         isAuthenticated,
      }),
      [isAuthenticated],
   );

   useEffect(() => {
      setIsAuthenticated(data);
   }, [data]);

   console.log({ isAuthenticated });

   return (
      <AuthContext.Provider value={contextValue}>
         <Outlet />
      </AuthContext.Provider>
   );
}

export async function rootRouter() {
   const token = localStorage.getItem('token');

   try {
      const Response = await fetch(
         `https://rocket-moves-server.vercel.app/validate`,
         configFetch({ method: 'POST', body: JSON.stringify({ token }) }),
      );
      const Result = await Response.json();

      return Result?.isAuthenticated ? true : false;
   } catch (error) {
      return false;
   }
}
