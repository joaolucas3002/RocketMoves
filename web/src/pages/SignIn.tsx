import { RxLockClosed, RxEnvelopeClosed } from 'react-icons/rx';

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
   ContainerScrollbar,
   LinkButton,
} from '../styles/styledsLoaginAndRecord';
import { TextLink, Button } from '../styles/styledGlobal';
import { theme } from '../theme';
import { FormEvent, useEffect, useState } from 'react';
import { baseURL } from '../lib/fetch';
import { fetchPost } from '../utils/fetchPost';
import ifTokenValidCookie from '../utils/ifTokenValidAddLocalStorage';
import axios from 'axios';
import Cookies from 'js-cookie';

const { color, font } = theme;

async function validadeError(rest: Response) {
   const { message } = await rest.json();

   if (typeof message === 'string') {
      const yy = await JSON.parse(message);

      console.log(yy);
   } else {
      console.log(message);
   }
}

interface ObjProps {
   email: string;
   password: string;
}

export function SignIn() {
   const [Obj, setObj] = useState<ObjProps>({
      email: '',
      password: '',
   });

   async function SubmitForm(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const restt =
       await fetchPost({ parens: '/', body: Obj });
      //  await axios.post(`${baseURL}${'/'}`, Obj,{
      //    withCredentials: true,
      //  });

      const cook = Cookies;

      console.log(restt, cook);
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
               <Subtitle>Faça seu login</Subtitle>
               <Form onSubmit={(e) => SubmitForm(e)}>
                  <ContainerInput>
                     <CreateInput
                        Svg={RxEnvelopeClosed}
                        type="text"
                        placeholder="E-mail"
                        name="email"
                        id="email"
                        onChange={(e) =>
                           setObj({ ...Obj, email: e.target.value })
                        }
                        value={Obj.email}
                     />
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
                  </ContainerInput>
                  <LinkButton>Entrar</LinkButton>
               </Form>
               <ContainerLink>
                  <TextLink to="/signup">Criar conta</TextLink>
               </ContainerLink>
            </Section>
            <ContainerImg>
               <Img src={RocketMovesInhSVG} alt="" />
            </ContainerImg>
         </ContainerMain>
      </ContainerScrollbar>
   );
}
