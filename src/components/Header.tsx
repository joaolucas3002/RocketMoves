import styled from 'styled-components';
import { theme } from '../theme';
import image1 from '../assets/image1.png';
import { MaxWidth } from '../styles/Global';
import { Link } from 'react-router-dom';

const { font, color } = theme;

const MarginBottom = styled.div`
   width: 100%;
   border-bottom: 1px solid ${color.fifth};
`;

const ContainerHeader = styled.div`
   height: 10.5rem;
   width: 100%;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   gap: 5%;
`;

const Logo = styled(Link)`
   color: ${color.first};
   font-family: ${font.family.robotoSlab};
   font-size: ${font.size.lg};
   line-height: ${font.lineHeight};
   font-weight: 700;
   text-decoration: none;

   @media (max-width: 620px) {
      display: none;
   }
`;

const Input = styled.input`
   font-size: ${font.size.sm};
   width: 100%;
   background-color: ${color.secondBg};
   border-radius: 1rem;
   color: ${color.third};
   font-weight: 400;
   line-height: ${font.lineHeight};
   padding: 1.9rem 1.4rem 1.9rem 2.2rem;

   ::placeholder,
   ::-webkit-input-placeholder {
      color: ${color.second};
   }
   :-ms-input-placeholder {
      color: ${color.second};
   }
`;

const ContainerInfo = styled.div`
   display: flex;
   flex-direction: row;
   gap: 0.9rem;
`;

const Cont = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: flex-end;

   @media (max-width: 768px) {
      display: none;
   }
`;

const Name = styled.h3`
   width: 100%;
   white-space: nowrap;
   color: ${color.third};
   font-family: ${font.family.robotoSlab};
   font-size: ${font.size.sm};
   font-weight: 700;
   line-height: ${font.lineHeight};
`;

const Leave = styled.span`
   color: ${color.second};
   font-family: ${font.family.robotoSlab};
   font-size: ${font.size.sm};
   font-weight: 400;
   line-height: ${font.lineHeight};
`;

const ContainerImg = styled(Link)`
   height: 6.41rem;
   width: 6.41rem;
   overflow: hidden;
   border: 2px solid ${color.fifth};
   border-radius: 50%;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: ${color.thirdBg};

   :focus {
      outline: 2px solid ${color.third};
      outline-offset: 3px;
   }
`;

interface HeaderProps {
   name: string;
   url: string;
}

export function Header({ name, url }: HeaderProps) {
   function validateLinghtString(name: string) {
      if (name.length > 20) {
         const filterName = name.substring(0, 17);

         return `${filterName}...`;
      } else {
         return name;
      }
   }

   const Names = validateLinghtString(name);

   return (
      <MarginBottom>
         <MaxWidth>
            <ContainerHeader>
               <Logo to={'/home'}>RocketMovies</Logo>
               <Input placeholder="Pesquisar pelo título" />
               <ContainerInfo>
                  <Cont>
                     <Name>{Names}</Name>
                     <Leave>sair</Leave>
                  </Cont>
                  <ContainerImg to={url}>
                     {/* <img src={image1} alt="" /> */}
                  </ContainerImg>
               </ContainerInfo>
            </ContainerHeader>
         </MaxWidth>
      </MarginBottom>
   );
}
