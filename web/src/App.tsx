import { GlobalStyle } from './global';
import {  RouterProvider } from 'react-router-dom';
import { route } from './routes';

export default function App() {
   return (
      <>
         <GlobalStyle />
         <RouterProvider router={route} />
      </>
   );
}
