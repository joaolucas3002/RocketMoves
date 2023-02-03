import { TbArrowLeft } from 'react-icons/tb';
import { FiClock } from 'react-icons/fi';

import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ButtonHistory } from '../components/ButtonHistory';
import { Header } from '../components/Header';
import { Stars } from '../components/Stars';
import { posts } from '../informacoes';

import {
   MaxWidthScrollbar,
   Title,
   ContainerHidden,
} from '../styles/styledGlobal';
import { theme } from '../theme';
import { validateLinghtString } from '../utils/validateLinghtString';

const { color, font, border, header } = theme;

const ContainerMain = styled.div`
   padding-block: 3rem 6rem;
   display: flex;
   flex-direction: column;
   gap: 3rem;
`;

const ContainerInfo = styled.div`
   display: flex;
   flex-direction: column;
   gap: 2.4rem;
`;

const ContainerWrap = styled.section`
   display: flex;
   align-items: center;
   flex-wrap: wrap;
   gap: 1.6rem;
`;

const Name = styled.span`
   color: ${color.third};
   font-family: ${font.family.roboto};
   font-size: ${font.size.base};
   font-weight: 400;
   line-height: ${font.lineHeight};
`;
//FiClock
const Date = styled.span`
   color: ${color.third};
   font-family: ${font.family.roboto};
   font-size: ${font.size.base};
   font-weight: 400;
   line-height: ${font.lineHeight};

   display: flex;
   align-items: center;
   gap: 0.6rem;
`;

const Text = styled.p`
   color: ${color.third};
   font-size: ${font.size.base};
   font-weight: 400;
   line-height: ${font.lineHeight};
   font-family: ${font.family.robotoSlab};
`;

const ContainerTag = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   gap: 0.8rem;
`;

const Tag = styled(Link)`
   color: ${color.fourth};
   font-family: ${font.family.roboto};
   font-size: ${font.size.xs};
   line-height: ${font.lineHeight};
   font-weight: 400;
   text-transform: capitalize;
   text-decoration: none;

   border-radius: ${border.radius};
   padding: 0.8rem 1.6rem;
   background-color: ${color.first5Alpha};

   :hover {
      text-decoration: underline;
   }

   :focus {
      outline: 2px solid ${color.fourth};
      outline-offset: 3px;
   }
`;

export function Post() {
   const params = useParams();

   const name = 'Rodrigo Gonsalves da silva ';

   const nameLinght = validateLinghtString(name);

   const Id = params.id ? parseInt(params.id) : 0;

   const { title, tags, post, stars } = posts[Id];

   return (
      <ContainerHidden>
         <Header name={nameLinght} url="/profile" />

         <MaxWidthScrollbar>
            <ContainerMain>
               <ContainerInfo>
                  <ButtonHistory>
                     <TbArrowLeft /> Voltar
                  </ButtonHistory>
                  <ContainerWrap>
                     <Title>{title}</Title>
                     <Stars amountOfStar={stars} />
                  </ContainerWrap>
                  <ContainerWrap>
                     <Name>Por {nameLinght}</Name>
                     <Date>
                        <FiClock color={color.first} />
                        23/02/22 às 08:00
                     </Date>
                  </ContainerWrap>
               </ContainerInfo>
               <ContainerTag>
                  {tags.map((tag, index) => (
                     <Tag key={`${tag}-${index}`} to={'#'}>
                        {tag}
                     </Tag>
                  ))}
               </ContainerTag>
               <Text>{post}</Text>
            </ContainerMain>
         </MaxWidthScrollbar>
      </ContainerHidden>
   );
}
