import { TbArrowLeft } from 'react-icons/tb';
import { FiClock } from 'react-icons/fi';

import {
   Link,
   LoaderFunctionArgs,
   useLoaderData,
   useParams,
} from 'react-router-dom';
import styled from 'styled-components';

import { ButtonHistory } from '../components/ButtonHistory';
import { Header } from '../components/Header';
import { Stars } from '../components/Stars';

import {
   MaxWidthScrollbar,
   Title,
   ContainerHidden,
   MaxWidth,
} from '../styles/styledGlobal';
import { theme } from '../theme';
import { useEffect, useState } from 'react';
import { configFetch } from '../utils/configFetch';
import { baseURL } from '../lib/fetch';
import { AuthContextFetch } from '../utils/AuthContextFetch';

const { color, font, border } = theme;

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
   overflow-wrap: break-word;
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

interface GetPostProsp {
   date: string;
   id: string;
   post: string;
   stars: number;
   tags: Tag[];
   title: string;
   user: { userName: string };
}

interface Tag {
   tag: string;
}

export function Post() {
   const GetPost = useLoaderData() as GetPostProsp;

   return (
      <MaxWidthScrollbar>
         <MaxWidth>
            <ContainerMain>
               <ContainerInfo>
               <ButtonHistory>
                     <TbArrowLeft /> Voltar
                  </ButtonHistory>
                  <ContainerWrap>
                     <Title>{GetPost.title}</Title>
                     <Stars amountOfStar={GetPost.stars} />
                  </ContainerWrap>
                  <ContainerWrap>
                     <Name>Por {GetPost?.user?.userName}</Name>
                     <Date>
                        <FiClock color={color.first} />
                        23/02/22 às 08:00
                     </Date>
                  </ContainerWrap>
               </ContainerInfo>
               <ContainerTag>
                  {GetPost.tags.map(({ tag }, index) => (
                     <Tag key={`${tag}-${index}`} to={'#'}>
                        {tag}
                     </Tag>
                  ))}
               </ContainerTag>
               <Text>{GetPost.post}</Text>
            </ContainerMain>
         </MaxWidth>
      </MaxWidthScrollbar>
   );
}

export async function getPost({ params }: LoaderFunctionArgs) {
   const { id } = params;

   try {
      const res = await fetch(
         `${baseURL}/post/${id}`,
         configFetch({ method: 'GET' }),
      );
      const json = await res.json();

      console.log(json);

      if (!res?.ok) {
         throw new Error('erroe reoor ');
      }

      return json;
   } catch (error) {
      throw new Error('erroe reoor ');
   }
}
