import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { theme } from '../../theme';

const { font, color, border } = theme;

export const ContainerButton = styled.div`
   max-width: 20.7rem;
   width: auto;
`;

export const ButtonSmall = styled(Link)`
   height: 4.8rem;
   width: 100%;
   border-radius: 1rem;
   background-color: ${color.first};
   padding-inline: 2.4rem;
   text-decoration: none;

   color: ${color.firstBg};
   font-size: ${font.size.base};
   font-weight: 500;
   font-family: ${font.family.roboto};

   display: flex;
   justify-content: center;
   align-items: center;
   gap: 0.8rem;
   transition: background-color 0.2s linear;

   :hover {
      background-color: ${color.firstHover};
   }

   @media (max-width: 400px) {
      padding-inline: 1.4rem;
      border-radius: 1.8rem;
   }

   :focus {
      outline: 2px solid ${color.fourth};
      outline-offset: 3px;
   }
`;

export const TextButton = styled.span`
   display: inline-block;

   @media (max-width: 400px) {
      display: none;
   }
`;

export const Section = styled.section`
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

export const ContainerPosts = styled.div`
   display: flex;
   gap: 2rem;
   flex-direction: column;
`;

export const Main = styled.main`
   display: flex;
   flex-direction: column;
   gap: 3rem;
   padding-top: 3.5rem;
   padding-inline: 0.5rem;
   padding-bottom: 4.5rem;

   overflow: overlay;

   ::-webkit-scrollbar {
      width: 0.8rem;
   }

   ::-webkit-scrollbar-track {
      background: transparent;
   }

   ::-webkit-scrollbar-thumb {
      background: ${color.first};
      border-radius: ${border.radius};
   }

   ::-webkit-scrollbar-thumb:hover {
      background: ${color.firstHover};
   }
`;
