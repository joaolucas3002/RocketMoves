import styled from 'styled-components';
import { theme } from '../theme';

const { color, font, border } = theme;

export const Description = styled.p`
   color: ${color.fourth};
   font-size: ${font.size.sm};
   font-weight: 400;
   font-family: ${font.family.robotoSlab};
   line-height: ${font.lineHeight};
`;

export const Logo2xl = styled.h2`
   width: 100%;
   font-weight: 700;
   color: ${color.first};
   font-family: ${font.family.robotoSlab};
   font-size: clamp(3rem, 4.5vw, ${font.size['2xl']});
   line-height: ${font.lineHeight};
`;

export const Subtitle = styled.h2`
   color: ${color.third};
   font-size: clamp(${font.size.lg});
   line-height: ${font.lineHeight};
   font-family: ${font.family.robotoSlab};
   font-weight: 500;
`;

export const ContainerMain = styled.main`
   display: flex;
   flex-direction: row;
`;

export const Section = styled.section`
   min-height: 100vh;
   width: min(100%, 36rem);
   height: 100%;
   display: flex;
   padding: 0 2rem 15vh;
   margin: 0 auto;
   justify-content: center;
   flex-direction: column;
   gap: 3.6rem;
`;

export const Form = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 1.4rem;
`;

export const ContainerInput = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 0.8rem;
`;

export const ContainerLink = styled.div`
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
`;

export const ContainerImg = styled.div`
   min-height: 100vh;
   height: 100%;
   width: 55%;
   background-color: ${color.first5Alpha};
   display: block;
   align-items: center;
   overflow: hidden;
   position: relative;

   @media (max-width: 720px) {
      display: none;
      height: auto;
   }
`;

export const Img = styled.img`
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   min-width: 100%;
   min-height: 100%;
   height: auto;
   width: auto;
`;


