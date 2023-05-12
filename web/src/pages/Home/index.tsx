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

import {
   ButtonSmall,
   ContainerButton,
   ContainerPosts,
   Main,
   Section,
   TextButton,
} from './styled';
import { useContext, useEffect, useState } from 'react';
import { AuthContextFetch } from '../../utils/AuthContextFetch';
import { baseURL } from '../../lib/fetch';
import { configFetch } from '../../utils/configFetch';
import { AuthContext } from '../../context/RootRouter';
import {
   Link,
   LoaderFunctionArgs,
   useLoaderData,
   useLocation,
} from 'react-router-dom';
import { Pagination } from '../../components/Pagination';
import { useURLSearchParams } from '../../hooks/useURLSearchParams';

interface PosptsProps {
   title: string;
   body: string;
   stars: number;
   id: string;
   tags: { tag: string }[];
}

interface objPorps {
   posts: PosptsProps[];
   validate: boolean;
   isAuthenticated: boolean;
   previous: number | undefined;
   next: number | undefined;
   page: number;
   query: string;
}

export async function loaderHome({ request }: LoaderFunctionArgs) {
   try {
      const token = localStorage.getItem('token');

      const SearchParams = useURLSearchParams(request.url);

      const page = SearchParams.get('page');

      const query = SearchParams.get('query');

      const pageValidation = Number(page) ? Number(page) : 1;

      console.log({ pageValidation });

      const queryValidation = query ? query : '';

      const response = await fetch(
         'http://localhost:3000/post',
         configFetch({
            method: 'POST',
            body: JSON.stringify({
               token,
               page: pageValidation,
               query: queryValidation,
            }),
         }),
      );

      const Result = await response.json();
      console.log(Result);

      if (Result?.isAuthenticated == true) {
         const { isAuthenticated, ...rest } = Result;

         return { validate: true, ...rest };
      } else {
         return { posts: [], validate: true };
      }
   } catch (error) {}
}

export function Home() {
   const { isAuthenticated } = useContext(AuthContext);

   const { posts, validate, previous, page, next, query }: objPorps =
      useLoaderData() as objPorps;

   // useEffect(() => setIsAuthenticated?.(validate), [isAuthenticated]);

   return (
      <MaxWidthScrollbar>
         <MaxWidth>
            <Main>
               <Section>
                  <Title>Meus filmes</Title>
                  <ContainerButton>
                     <ButtonSmall to="post/new">
                        <IoAddOutline size={24} />
                        <TextButton>Adicionar Filme</TextButton>
                     </ButtonSmall>
                  </ContainerButton>
               </Section>
               <ContainerPosts>
                  {posts?.length > 0 &&
                     posts.map(({ body, title, id, tags, stars }) => (
                        <Post
                           key={id}
                           id={id}
                           stars={stars}
                           title={title}
                           post={body}
                           tags={tags.map((t) => t.tag)}
                        />
                     ))}
               </ContainerPosts>

               <Pagination
                  previous={previous}
                  page={page}
                  next={next}
                  query={query}
               />
            </Main>
         </MaxWidth>
      </MaxWidthScrollbar>
   );
}
