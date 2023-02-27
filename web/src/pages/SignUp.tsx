import styled from 'styled-components';
import { RxLockClosed, RxPerson, RxEnvelopeClosed } from 'react-icons/rx';
import { TbArrowLeft } from 'react-icons/tb';

import { CreateInput } from '../components/CreateInput';

import RocketMovesInhSVG from '../assets/RocketMovesInhSVG.svg';

import {
   Description,
   Logo2xl,
   Subtitle,
   Section,
   ContainerInput,
   Form,
   ContainerMain,
   ContainerImg,
   ContainerLink,
   Img,
   ContainerError,
   ContainerScrollbar,
   LinkButton,
   InputError,
} from '../styles/styledsLoaginAndRecord';
import { TextLink, Button } from '../styles/styledGlobal';
import { theme } from '../theme';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { ResponseWithToken } from '../interfaces/ResponseWithToken';
import ifTokenValidCookie from '../utils/ifTokenValidAddLocalStorage';
import { baseURL } from '../lib/fetch';
import { fetchPost } from '../utils/fetchPost';
import { useNavigate } from 'react-router-dom'; // import do hook
import { ZodError } from 'zod';

const { color, font, border } = theme;

interface ObjProps {
   userName: string;
   email: string;
   password: string;
}

export function SignUp() {
   const [Obj, setObj] = useState<ObjProps>({
      userName: '',
      email: '',
      password: '',
   });
   const [Error, setError] = useState<string>('');

   async function SubmitForm(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      // const history = useNavigate()

      const props = { body: Obj, parens: '/signup' };

      const rest = await fetchPost(props);

      // rest && (await ifTokenValidCookie(rest));
   }

   return (
      <ContainerScrollbar>
         <ContainerMain>
            <Section>
               <div>
                  <Logo2xl>RocketMovies</Logo2xl>
                  <Description>
                     Aplicação para acompanhar tudo que assistir.
                  </Description>
               </div>
               <Subtitle>Crie sua conta</Subtitle>
               <Form
                  name="SignUpForm"
                  onSubmit={(e) => SubmitForm(e)}
                  action=""
                  method="POST"
                  target="_blank"
               >
                  <ContainerInput>
                     <ContainerError>
                        <CreateInput
                           Svg={RxPerson}
                           type="text"
                           placeholder="Usuário"
                           name="userName"
                           id="userName"
                           onChange={(e) =>
                              setObj({ ...Obj, userName: e.target.value })
                           }
                           value={Obj.userName}
                        />
                     </ContainerError>
                     <ContainerError>
                        <CreateInput
                           Svg={RxEnvelopeClosed}
                           type="email"
                           placeholder="E-mail"
                           name="email"
                           id="email"
                           onChange={(e) =>
                              setObj({ ...Obj, email: e.target.value })
                           }
                           value={Obj.email}
                        />
                     </ContainerError>
                     <ContainerError>
                        <CreateInput
                           Svg={RxLockClosed}
                           type="password"
                           placeholder="Senha"
                           name="password"
                           id="password"
                           onChange={(e) =>
                              setObj({ ...Obj, password: e.target.value })
                           }
                           value={Obj.password}
                        />
                     </ContainerError>
                  </ContainerInput>
                  <LinkButton>Cadastrar</LinkButton>
               </Form>
               <ContainerLink>
                  <TextLink to="/">
                     <TbArrowLeft /> Voltar para o login
                  </TextLink>
               </ContainerLink>
            </Section>
            <ContainerImg>
               <Img
                  src={RocketMovesInhSVG}
                  alt="imagem de uma sala de cinema"
               />
            </ContainerImg>
         </ContainerMain>
      </ContainerScrollbar>
   );
}
