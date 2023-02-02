import styled from 'styled-components';
import { CreateInput } from '../components/CreateInput';
import { RxPerson, RxEnvelopeClosed } from 'react-icons/rx';
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
import { TextLink, Button } from '../styles/global';
import RocketMovesInhSVG from '../assets/RocketMovesInhSVG.svg';
import { theme } from '../theme';

const { color, font } = theme;

export function Login() {
   return (
      <ContainerMain>
         <Section>
            <div>
               <Logo2xl>RocketMovies</Logo2xl>
               <Description>
                  Aplicação para acompanhar tudo que assistir.
               </Description>
            </div>
            <Subtitle>Faça seu login</Subtitle>
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
               </ContainerInput>
               <Button>Entrar</Button>
            </Form>
            <ContainerLink>
               <TextLink to="/record">Criar conta</TextLink>
            </ContainerLink>
         </Section>

         <ContainerImg>
            <Img src={RocketMovesInhSVG} alt="" />
         </ContainerImg>
      </ContainerMain>
   );
}
