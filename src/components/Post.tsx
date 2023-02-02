import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { TitleSection } from '../styles/Global';
import { Stars } from './Stars';

import { theme } from '../theme';


const { font, color, border } = theme;

const ContainerPost = styled(Link)`
   background-color: ${color.first5Alpha};
   padding: 3rem;
   border-radius: 1rem;
   display: flex;
   flex-direction: column;
   gap: 1.3rem;
   text-decoration: none;

   :focus {
      outline: 2px solid ${color.first};
      outline-offset: 3px;
   }
`;

const PP = styled.p`
   color: ${color.fifth};
   font-weight: 500;
   font-family: ${font.family.roboto};
   font-size: ${font.size.base};
   line-height: ${font.lineHeight};
`;

const ContainerInfo = styled.div`
   display: flex;
   flex-direction: column;
   gap: 0.8rem;
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
   let ValuePost = post;

   if (post.length > 288) {
      const text = post.substring(0, 285);

      ValuePost = `${text}...`;
   }

   return (
      <ContainerPost to={`/post/${id}`}>
         <ContainerInfo>
            <TitleSection>{title}</TitleSection>
            <Stars amountOfStar={stars} />
         </ContainerInfo>
         <PP>{ValuePost}</PP>
         {tags.length > 0 && (
            <ContainerTags>
               {tags.map((tag) => (
                  <Tag key={tag} to={'#'}>
                     {tag}
                  </Tag>
               ))}
            </ContainerTags>
         )}
      </ContainerPost>
   );
}
