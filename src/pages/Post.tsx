import { TbArrowLeft } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ButtonHistory } from '../components/ButtonHistory';
import { Header } from '../components/Header';

import {
   MaxWidthScrollbar,
   Title,
   ContainerHidden,
} from '../styles/styledGlobal';
import { theme } from '../theme';

const { color, font, border, header } = theme;

const ContainerInfo = styled.div``;

const ContainerTag = styled.div`
   display: flex;
   flex-direction: row;
   gap: 0.8rem;
`;

const Text = styled.p`
   color: ${color.third};
   font-size: ${font.size.base};
   font-weight: 400;
   line-height: ${font.lineHeight};
   font-family: ${font.family.robotoSlab};
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
   const name = 'Rodrigo Gonçalves silva';

   const Array: string[] = ['Ficção Científica', 'Drama', 'Família'];

   return (
      <ContainerHidden>
         <Header name={name} url="/profile" />

         <MaxWidthScrollbar>
            <ContainerInfo>
               <ButtonHistory>
                  <TbArrowLeft /> Voltar
               </ButtonHistory>
               <Title>Interestellar</Title>
            </ContainerInfo>

            <ContainerTag>
               {Array.map((tag, index) => (
                  <Tag key={`${tag}-${index}`} to={'#'}>
                     {tag}
                  </Tag>
               ))}
            </ContainerTag>

            <Text>
               Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Laboriosam eligendi nisi architecto atque quo saepe vel commodi
               autem odit eaque omnis quibusdam dicta totam eum, tempore animi!
               Sunt, praesentium porro. Lorem ipsum dolor sit amet consectetur
               adipisicing elit. Distinctio aperiam vel consequuntur impedit sed
               eius quae, soluta debitis repellat quod, architecto error earum
               enim dicta ipsa dolores laboriosam tempora quam. Lorem ipsum
               dolor sit amet consectetur adipisicing elit. Numquam voluptates
               vero quidem tempora aut nisi ullam fugiat nemo quae a quisquam
               praesentium fuga deleniti, dolorem incidunt laborum aliquid
               provident soluta?
            </Text>
         </MaxWidthScrollbar>
      </ContainerHidden>
   );
}
