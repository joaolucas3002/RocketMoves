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
   ContainerError,
   InputError,
} from '../styles/styledsLoaginAndRecord';
import { TextLink, Button } from '../styles/styledGlobal';
import { theme } from '../theme';
import { configFetch } from '../utils/configFetch';
import { baseURL } from '../lib/fetch';
import {
   ActionFunctionArgs,

   useActionData,
} from 'react-router-dom';

interface ErrorProps {
   message: string;
   path: string[];
}

interface errorsProps {
   isAuthenticated: boolean;
   email?: string;
   password?: string;
}

export function SignIn() {
   const errors = useActionData() as errorsProps;

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
               <Form method="POST" action="/login">
                  <ContainerInput>
                     <ContainerError>
                        <CreateInput
                           Svg={RxEnvelopeClosed}
                           type="text"
                           placeholder="E-mail"
                           name="email"
                        />
                        {errors?.email && (
                           <InputError>{errors.email}</InputError>
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
                           <InputError>{errors.password}</InputError>
                        )}
                     </ContainerError>
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

export async function SubmitFormSignIn({ request }: ActionFunctionArgs) {
   const data = await request.formData();

   const email = data.get('email');

   const password = data.get('password');

   try {
      const Response = await fetch(
         `${baseURL}/`,
         configFetch({
            method: request.method,
            body: JSON.stringify({ password, email }),
         }),
      );

      const Result = await Response.json();


      if (Result?.isAuthenticated) {
         const token = Result?.token;

         token && localStorage.setItem('token', token);

         return { isAuthenticated: true };
      } else {
         console.log('erro');
         const error: ErrorProps[] = JSON.parse(Result?.message);

         const er = error.reduce((acc, e) => {
            if (e.path[0] === 'email') {
               return (acc = { ...acc, email: e.message });
            } else if (e.path[0] === 'password') {
               return (acc = { ...acc, password: e.message });
            }
            return acc;
         }, {});

         return { ...er, isAuthenticated: false };
      }
   } catch (err) {
      console.error('err');
      return { isAuthenticated: false };
   }
}

// async function SubmitForm(event: FormEvent<HTMLFormElement>) {
//    event.preventDefault();

//    try {
//       const Response = await fetch(
//          `${baseURL}/`,
//          configFetch({ method: 'POST', body: JSON.stringify(Obj) }),
//       );

//       const Result = await Response.json();

//       console.log({ Response, Result });

//       setIsAuthenticated?.(
//          Result?.isAuthenticated ? Result?.isAuthenticated : false,
//       );

//       setEmailError(undefined);
//       setPasswordError(undefined);

//       if (Result?.isAuthenticated) {
//          const token = Result?.token;

//          token && localStorage.setItem('token', token);

//          //
//       } else {
//          const error: ErrorProps[] = Result?.message;

//          error.map((e) => {
//             if (e.path[0] === 'email') setEmailError(e.message);

//             if (e.path[0] === 'password') setPasswordError(e.message);
//          });

//          return;
//       }
//    } catch (err) {
//       console.error(err);
//    }
// }
