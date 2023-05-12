import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Subtitle } from '../styles/styledGlobal';
import { Stars } from './Stars';

import { theme } from '../theme';

const { font, color, border } = theme;

const ContainerArticle = styled.article`
   background-color: ${color.first5Alpha};
   padding: 3rem;
   border-radius: 1rem;
   display: flex;
   flex-direction: column;
   gap: 1.3rem;
   text-decoration: none;
   overflow: hidden;

   :focus {
      outline: 2px solid ${color.first};
      outline-offset: 3px;
   }
`;

const ContainerPost = styled.p`
   color: ${color.fifth};
   text-overflow: ellipsis;
   overflow: hidden;
   word-break: break-all;
   font-weight: 500;
   overflow-wrap: break-word;
   font-family: ${font.family.roboto};
   font-size: ${font.size.base};
   line-height: ${font.lineHeight};
`;

const ContainerInfo = styled.div`
   display: flex;
   flex-direction: column;
   gap: 0.8rem;
   width: fit-content;
`;

const LinkPost = styled(Link)`
   text-decoration: none;
`;

const ContainerTags = styled.div`
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
   border-radius: ${border.radius};
   padding: 0.5rem 1.6rem;

   text-transform: capitalize;
   text-decoration: none;
   background-color: ${color.fourthBg};

   :hover {
      text-decoration: underline;
   }

   :focus {
      outline: 2px solid ${color.fourth};
      outline-offset: 3px;
   }
`;

interface PostProps {
   title: string;
   post: string;
   stars: number;
   id: string;
   tags: string[];
}

export function Post({ title, post, stars, id, tags }: PostProps) {
   return (
      <ContainerArticle>
         <LinkPost to={`/post/${id}`}>
            <ContainerInfo>
               <Subtitle>{title}</Subtitle>
               <Stars amountOfStar={stars} />
            </ContainerInfo>
            <ContainerPost>{post}</ContainerPost>
         </LinkPost>
         {tags.length > 0 && (
            <ContainerTags>
               {tags.map((tag, index) => (
                  <Tag key={`-${index}`} to="#">
                     {tag}
                  </Tag>
               ))}
            </ContainerTags>
         )}
      </ContainerArticle>
   );
}
