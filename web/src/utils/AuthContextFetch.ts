import { useContext } from 'react';
import { AuthContext } from '../context/RootRouter';
import { baseURL } from '../lib/fetch';
import { configFetch } from './configFetch';

interface AuthContextFetchProps extends RequestInit {
   params: string;
}

export async function AuthContextFetch({
   params = '/',
   ...rest
}: AuthContextFetchProps) {
   try {
      const Response = await fetch(
         `${baseURL}${params}`,
         configFetch({ ...rest }),
      );
      const Result = await Response.json();

      if (Response.ok) {
         console.log(Result);

         return Result;
      }

      console.log('test true test');
   } catch (err) {
      console.log('oioi');

      console.error(err);

      return;
   }
}
