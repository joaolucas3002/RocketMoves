import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../theme';

const { color, font, border } = theme;

export const ContainerHidden = styled.div`
   height: 100vh;
   width: 100vw;
   display: grid;
   grid-template-columns: 1fr;
   grid-template-rows: min-content auto;
`;

export const MaxWidth = styled.div`
   margin: 0 auto;
   height: 100%;
   width: min(100%, 141rem);
   padding-inline: min(7vw, 8rem);
`;

export const MaxWidthScrollbar = styled.div`
   width: 100%;

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

export const Title = styled.h2`
   color: ${color.third};
   font-size: ${font.size.xl};
   line-height: ${font.lineHeight};
   font-family: ${font.family.robotoSlab};
   font-weight: 400;
`;

export const Subtitle = styled.h2`
   color: ${color.third};
   font-size: ${font.size.lg};
   line-height: ${font.lineHeight};
   font-family: ${font.family.robotoSlab};
   font-weight: 500;
`;

export const TextLink = styled(Link)`
   color: ${color.first};
   font-size: ${font.size.base};
   font-weight: 400;
   line-height: ${font.lineHeight};
   font-family: ${font.family.robotoSlab};
   text-decoration: none;
   width: max-content;
   display: flex;
   align-items: center;

   gap: 0.8rem;

   :focus {
      text-decoration: underline;
   }
`;

export const ButtonProportions = styled.button`
   border-radius: ${border.radius};
   height: 5.6rem;
   display: flex;
   justify-content: center;
   line-height: ${font.lineHeight};
   cursor: pointer;

   align-items: center;
`;

export const Button = styled(ButtonProportions)`
   width: 100%;
   border-radius: ${border.radius};
   background-color: ${color.first};
   color: ${color.secondBg};
   font-size: ${font.size.base};
   font-weight: 500;
   font-family: ${font.family.robotoSlab};

   :focus {
      outline: 2px solid ${color.fourth};
      outline-offset: 3px;
   }
`;

export const ButtonSmall = styled.button`
   height: 4.8rem;
   width: 100%;
   border-radius: 1rem;
   background-color: ${color.first};

   color: ${color.secondBg};
   font-size: ${font.size.base};
   font-weight: 400;
   font-family: ${font.family.robotoSlab};

   display: flex;
   justify-content: center;
   align-items: center;
   gap: 0.8rem;
`;

export const ImgCover = styled.img`
   display: block;
   width: 100%;
   height: 100%;
   object-fit: cover;
`;
