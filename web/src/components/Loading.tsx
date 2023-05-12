import styled from 'styled-components';
import { ImSpinner3 } from 'react-icons/im';
import { theme } from '../theme';
import { useRouteError } from 'react-router-dom';
import { ButtonHistory } from './ButtonHistory';
import { TbArrowLeft } from 'react-icons/tb';

const { color, font, border } = theme;

const LoadingComponent = styled.div`
   color: ${color.fifth};
   font-size: 4rem;
   display: flex;
   justify-content: center;
   align-items: center;
   color: ${color.fifth};
   width: min(100%, 100vw);
   height: min(100%, 100vh);
`;

export function Loading() {
   let error = useRouteError();
   console.error(error);

   return (
      <LoadingComponent>
         <ButtonHistory>
            <TbArrowLeft /> Voltar
         </ButtonHistory>
      </LoadingComponent>
   );
}
