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
} from '../styles/styledsLoaginAndRecord';
import { TextLink, Button } from '../styles/Global';
import { theme } from '../theme';

const { color, font } = theme;

export function Record() {
   return (
      <ContainerMain>
         <Section>
            <div>
               <Logo2xl>RocketMovies</Logo2xl>

               <Description>
                  Aplicação para acompanhar tudo que assistir.
               </Description>
            </div>
            <Subtitle>Crie sua conta</Subtitle>
            <Form>
               <ContainerInput>
                  <CreateInput
                     Svg={RxPerson}
                     type="text"
                     placeholder="Name"
                     name="name"
                     id="name"
                  />

                  <CreateInput
                     Svg={RxEnvelopeClosed}
                     type="email"
                     placeholder="E-mail"
                     name="email"
                     id="email"
                  />

                  <CreateInput
                     Svg={RxLockClosed}
                     type="password"
                     placeholder="Senha"
                     name="password"
                     id="password"
                  />
               </ContainerInput>

               <Button>Cadastrar</Button>
            </Form>
            <ContainerLink>
               <TextLink to="/">
                  <TbArrowLeft /> Voltar para o login
               </TextLink>
            </ContainerLink>
         </Section>
         <ContainerImg>
            <Img src={RocketMovesInhSVG} alt="imagem de uma sala de cinema" />
         </ContainerImg>
      </ContainerMain>
   );
}
