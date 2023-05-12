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
import { configFetch } from '../utils/configFetch';
import {
   ActionFunctionArgs,
   useActionData,
} from 'react-router-dom'; // import do hook
import { baseURL } from '../lib/fetch';

interface ObjProps {
   userName?: string;
   email?: string;
   password?: string;
   isAuthenticated: boolean;
}

interface ErrorProps {
   message: string;
   path: string[];
}

export function SignUp() {
   const errors = useActionData() as ObjProps;

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
               <Form action="/signup" method="POST">
                  <ContainerInput>
                     <ContainerError>
                        <CreateInput
                           Svg={RxPerson}
                           type="text"
                           placeholder="Usuário"
                           name="userName"
                        />

                        {errors?.userName && (
                           <InputError>{errors?.userName}</InputError>
                        )}
                     </ContainerError>
                     <ContainerError>
                        <CreateInput
                           Svg={RxEnvelopeClosed}
                           type="email"
                           placeholder="E-mail"
                           name="email"
                        />
                        {errors?.email && (
                           <InputError>{errors?.email}</InputError>
                        )}
                     </ContainerError>
                     <ContainerError>
                        <CreateInput
                           Svg={RxLockClosed}
                           type="password"
                           placeholder="Senha"
                           name="password"
                        />
                        {errors?.password && (
                           <InputError>{errors?.password}</InputError>
                        )}
                     </ContainerError>
                  </ContainerInput>
                  <LinkButton>Cadastrar</LinkButton>
               </Form>
               <ContainerLink>
                  <TextLink to="/login">
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

export async function SubmitFormSignUp({ request }: ActionFunctionArgs) {
   const data = await request.formData();

   const userName = data.get('userName');

   const email = data.get('email');

   const password = data.get('password');

   try {
      const Response = await fetch(
         `${baseURL}/signup`,
         configFetch({
            method: 'POST',
            body: JSON.stringify({ userName, email, password }),
         }),
      );
      const Result = await Response.json();

      if (Result?.isAuthenticated) {
         const token = Result?.token;

         localStorage.setItem('token', token);

         return { isAuthenticated: true };
      } else {
         const error: ErrorProps[] = await JSON.parse(Result?.message);

         const red = error.reduce((acc, e) => {
            if (e.path[0] === 'userName') {
               return (acc = { ...acc, userName: e.message });
            }
            if (e.path[0] === 'email') {
               return (acc = { ...acc, email: e.message });
            }
            if (e.path[0] === 'password') {
               return (acc = { ...acc, password: e.message });
            }
            return acc;
         }, {});

         return { ...red, isAuthenticated: false };
      }
   } catch (err) {
      console.log(err);
      return { isAuthenticated: false };
   }
}

