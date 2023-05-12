import { ContainerHidden } from '../styles/styledGlobal';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Layout() {
   return (
      <ContainerHidden>
         <Header name={'name'} url="/profile" />
         <Outlet />
      </ContainerHidden>
   );
}
