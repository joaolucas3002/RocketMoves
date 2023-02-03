import styled from 'styled-components';
import { IoAddOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { Header } from '../components/Header';
import { Post } from '../components/Post';

import { MaxWidthScrollbar, TitleSection,ContainerHidden } from '../styles/styledGlobal';

import { theme } from '../theme';

//
import { posts } from '../informacoes';

const { font, color } = theme;

const ContainerButton = styled.div`
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

   color: ${color.secondBg};
   font-size: ${font.size.base};
   font-weight: 400;
   font-family: ${font.family.robotoSlab};

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

const TextButton = styled.span`
   display: inline-block;

   @media (max-width: 400px) {
      display: none;
   }
`;

const Section = styled.section`
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

const ContainerPosts = styled.div`
   display: flex;
   gap: 2rem;
   flex-direction: column;
`;

const Main = styled.main`
   display: flex;
   flex-direction: column;
   gap: 3rem;
   padding-top: 3.5rem;
   padding-bottom: 4.5rem;
`;


const name = 'Rodrigo Gonçalves silva';

export function Home() {
   return (
      <ContainerHidden>
         <Header name={name} url="/profile" />

         <MaxWidthScrollbar>
            <Main>
               <Section>
                  <TitleSection>Meus filmes</TitleSection>

                  <ContainerButton>
                     <ButtonSmall to="/createPost">
                        <IoAddOutline size={24} />

                        <TextButton>Adicionar filme</TextButton>
                     </ButtonSmall>
                  </ContainerButton>
               </Section>

               <ContainerPosts>
                  {posts.map(({ post, title, stars, id, tags }) => (
                     <Post
                        id={id}
                        stars={stars}
                        title={title}
                        post={post}
                        tags={tags}
                     />
                  ))}
               </ContainerPosts>
            </Main>
         </MaxWidthScrollbar>
      </ContainerHidden>
   );
}
