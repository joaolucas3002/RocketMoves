import axios from 'axios';
import { ZodError } from 'zod';
import { baseURL } from '../lib/fetch';

interface fetchPostProps {
   parens: string;
   body: {};
}

export async function fetchPost({ body, parens }: fetchPostProps) {

   try {
      return await fetch(`${baseURL}${parens}`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
         body: JSON.stringify(body),
      });


   } catch (error) {
      if (error instanceof ZodError) {
         console.error({ aloo: 'zod', error });
      } else {
         console.error({ aloo: 'error', error });
      }
   }
}
