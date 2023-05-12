import { useState, useContext } from 'react';
import { TbArrowLeft } from 'react-icons/tb';
import styled from 'styled-components';

import { CreateTag } from '../../components/CreateTag';
import { Header } from '../../components/Header';
import { ButtonHistory } from '../../components/ButtonHistory';

import { CreateStar } from './CreateStar';
import { AddTag } from './AddTag';

import {
   Button,
   MaxWidthScrollbar,
   Title,
   ContainerHidden,
   MaxWidth,
} from '../../styles/styledGlobal';
import { ButtonProportions } from '../../styles/styledGlobal';
import { theme } from '../../theme';
import { configFetch } from '../../utils/configFetch';
import { baseURL } from '../../lib/fetch';
import { AuthContext } from '../../context/RootRouter';

const { color, font, border } = theme;

const ContainerMain = styled.main`
   padding-top: 4rem;
   padding-bottom: 6rem;
   display: flex;
   flex-direction: column;
   gap: 4rem;
`;

const ContainerColumn = styled.div`
   display: flex;
   flex-direction: column;
   align-items: left;
   gap: 2.4rem;
`;

const ContainerRow = styled.div`
   display: flex;
   flex-direction: row;
   gap: 4rem;

   @media (max-width: 545px) {
      flex-direction: column;
      gap: 2rem;
   }
`;

const Input = styled.input`
   width: 100%;
   color: ${color.third};
   padding: 1.8rem 1.6rem;
   border-radius: ${border.radius};
   font-family: ${font.family.roboto};
   font-weight: 400;
   font-size: ${font.size.base};
   line-height: ${font.lineHeight};
   background-color: ${color.secondBg};

   ::placeholder,
   ::-webkit-input-placeholder {
      color: ${color.second};
   }
   :-ms-input-placeholder {
      color: ${color.second};
   }

   :focus {
      outline: 2px solid ${color.first};
      outline-offset: 3px;
   }
`;

const Textarea = styled.textarea`
   width: 100%;
   height: 30rem;
   word-break: break-all;
   padding: 1.8rem 1.6rem;
   color: ${color.third};
   border-radius: ${border.radius};
   font-family: ${font.family.roboto};
   font-weight: 400;
   font-size: ${font.size.base};
   line-height: ${font.lineHeight};
   background-color: ${color.secondBg};
   resize: none;

   ::placeholder,
   ::-webkit-input-placeholder {
      color: ${color.second};
   }
   :-ms-input-placeholder {
      color: ${color.second};
   }

   :focus {
      outline: 2px solid ${color.first};
      outline-offset: 3px;
   }
`;

const ButtonClose = styled(ButtonProportions)`
   color: ${color.first};
   width: 100%;
   font-family: ${font.family.robotoSlab};
   font-size: ${font.size.base};
   font-weight: 500;
   line-height: ${font.lineHeight};
   background-color: ${color.thirdBg};

   :focus {
      outline: 2px solid ${color.first};
      outline-offset: 3px;
   }
`;

const ConstinerTags = styled.div`
   padding: 1.6rem;
   background-color: ${color.thirdBg};
   width: fit-content;
   min-width: 100%;

   border-radius: ${border.radius};
   display: flex;
   flex-direction: row;
   gap: 2.4rem;
   flex-wrap: wrap;
`;

const BorderRadius = styled.div`
   border-radius: ${border.radius};
   overflow: hidden;
`;

const TitleH2 = styled.h2`
   font-family: ${font.family.robotoSlab};
   font-size: 2rem;
   color: ${color.fifth};
   line-height: ${font.lineHeight};
   font-weight: 400;
`;

const ContainerStars = styled.section`
   width: min-content;
   margin: 0 auto;
   padding: 1.8rem 1.6rem;
   border-radius: ${border.radius};
   color: ${color.first};
   background-color: ${color.secondBg};

   display: flex;
   align-items: center;
   gap: 1rem;
`;

export function CreatePost() {
   const [arrayTags, setArrayTags] = useState<string[]>([]);
   const [stars, setStars] = useState<number>(0);
   const [inputValue, setInputValue] = useState<string>('');
   const [textarea, setTextarea] = useState<string>('');

   const token = localStorage.getItem('token');

   async function AddPost() {
      const props = {
         title: inputValue,
         stars: stars,
         tags: arrayTags,
         body: textarea,
         token,
      };

      try {
         const response = await fetch(
            `${baseURL}/post/new`,
            configFetch({
               body: JSON.stringify(props),
               method: 'POST',
            }),
         );

         const Result = await response.json();

         setArrayTags([]);
         setStars(0);
         setInputValue('');
         setTextarea('');
         if (true) {
         } else {
            // const ttt = await rest.json();
            // ttt?.isAuthenticated;
         }
      } catch (err) {
         console.error(err);
      }
   }

   return (
      <MaxWidthScrollbar>
         <MaxWidth>
            <ContainerMain>
               <ContainerColumn>
                  <ButtonHistory>
                     <TbArrowLeft /> Voltar
                  </ButtonHistory>
                  <Title>Comentario</Title>
               </ContainerColumn>
               <ContainerRow>
                  <Input
                     value={inputValue}
                     onChange={(e) => {
                        setInputValue(e.target.value);
                     }}
                     name='title'
                     type="text"
                     placeholder="Título"
                  />

                  <ContainerStars>
                     <CreateStar indexStar={stars} setStars={setStars} />
                  </ContainerStars>
               </ContainerRow>
               <div>
                  <Textarea
                     value={textarea}
                     onChange={(e) => setTextarea(e.target.value)}
                     name="body"
                     id=""
                  />
               </div>
               <ContainerColumn>
                  <TitleH2>Marcadores</TitleH2>
                  <BorderRadius>
                     <MaxWidthScrollbar>
                        <ConstinerTags>
                           {arrayTags.map((title, index, array) => (
                              <CreateTag
                                 key={`${title}-${index}`}
                                 title={title}
                                 array={array}
                                 setArray={setArrayTags}
                              />
                           ))}
                           <AddTag
                              arrayTags={arrayTags}
                              setArrayTags={setArrayTags}
                              
                           />
                        </ConstinerTags>
                     </MaxWidthScrollbar>
                  </BorderRadius>
               </ContainerColumn>
               <ContainerRow>
                  <ButtonClose>Excluir</ButtonClose>
                  <Button onClick={AddPost}>Salvar</Button>
               </ContainerRow>
            </ContainerMain>
         </MaxWidth>
      </MaxWidthScrollbar>
   );
}
