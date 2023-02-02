import { TbArrowLeft } from 'react-icons/tb';
import styled from 'styled-components';

import { ButtonHistory } from '../components/ButtonHistory';
import { Header } from '../components/Header';

import { MaxWidthScrollbar, Title } from '../styles/Global';

export function Post() {
   const name = 'Rodrigo Gonçalves silva';

   return (
      <>
         <Header name={name} url="/profile" />

         <MaxWidthScrollbar>
            <ButtonHistory>
               <TbArrowLeft /> Voltar
            </ButtonHistory>
            <Title>Interestellar</Title>
         </MaxWidthScrollbar>
      </>
   );
}
