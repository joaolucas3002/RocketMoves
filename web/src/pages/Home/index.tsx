import { IoAddOutline } from 'react-icons/io5';
import { Header } from '../../components/Header';
import { Post } from '../../components/Post';

import {
   MaxWidthScrollbar,
   Title,
   ContainerHidden,
   MaxWidth,
} from '../../styles/styledGlobal';
import z from 'zod';

import { posts } from '../../informacoes';

import {
   ButtonSmall,
   ContainerButton,
   ContainerPosts,
   Main,
   Section,
   TextButton,
} from './styled';
import { useEffect, useState } from 'react';
import { fetchPost } from '../../utils/fetchPost';

interface PosptsProps {
   title: string;
   post: string;
   stars: number;
   id: string;
   tags: { tag: string }[];
}

const name = 'João Lucas da Silva Freita';

export function Home() {
   const [Posts, setPosts] = useState<PosptsProps[]>([]);

   useEffect(() => {
      const local = localStorage.getItem('token');

      const token = local ? local : '';

      const props = {
         body: { token },
         parens: '/post',
      };
      (async () => {
         try {
            const rest = await fetchPost(props);

            if (rest.ok) {
               const ttt = await rest.json();

               return setPosts(ttt);
            }
         } catch (error) {
            console.log(error);
            return setPosts([]);
         }
      })();
   }, []);

   return (
      <ContainerHidden>
         <Header name={name} url="/profile" />

         <MaxWidthScrollbar>
            <MaxWidth>
               <Main>
                  <Section>
                     <Title>Meus filmes</Title>
                     <ContainerButton>
                        <ButtonSmall to="/createPost">
                           <IoAddOutline size={24} />
                           <TextButton>Adicionar Filme</TextButton>
                        </ButtonSmall>
                     </ContainerButton>
                  </Section>
                  <ContainerPosts>
                     {Posts.length > 0 &&
                        Posts.map(({ post, title, id, tags, stars }) => (
                           <Post
                              key={id}
                              id={id}
                              stars={stars}
                              title={title}
                              post={post}
                              tags={tags.map((t) => t.tag)}
                           />
                        ))}
                  </ContainerPosts>
               </Main>
            </MaxWidth>
         </MaxWidthScrollbar>
      </ContainerHidden>
   );
}
