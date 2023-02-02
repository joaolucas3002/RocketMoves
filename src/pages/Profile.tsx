import styled from 'styled-components';
import { RxEnvelopeClosed, RxLockClosed, RxPerson } from 'react-icons/rx';
import { Button, MaxWidth, TextLink } from '../styles/global';
import { TbArrowLeft } from 'react-icons/tb';
import { CreateInput } from '../components/CreateInput';
import { ButtonHistory } from '../components/ButtonHistory';
import { theme } from '../theme';

const { font, color } = theme;

const ContainerHeader = styled.div`
   height: 13rem;
   width: 100%;
   background-color: ${color.first5Alpha};
`;

const ContainerInfo = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   position: relative;
   display: flex;
   align-items: center;
`;

const ContainerImg = styled.div`
   height: min(50vw, 18.6rem);
   width: min(50vw, 18.6rem);
   border-radius: 50%;
   background-color: #291b2e;
   position: absolute;
   left: 50%;
   top: 100%;
   transform: translate(-50%, -50%);
   overflow: hidden;
   border: 4px solid ${color.second};
`;

const ContainerForm = styled.main`
   width: min(100%, 38rem);
   height: 100%;
   padding-top: min(30vw, 11.3rem);
   padding-inline: 2rem;
   margin: 0 auto;
   display: flex;
   flex-direction: column;
   gap: 2.4rem;
`;

const Section = styled.section`
   display: flex;
   flex-direction: column;
   gap: 0.8rem;
`;

export function Profile() {
   return (
      <>
         <ContainerHeader>
            <MaxWidth>
               <ContainerInfo>
                  <ButtonHistory>
                     <TbArrowLeft /> Voltar
                  </ButtonHistory>

                  <ContainerImg></ContainerImg>
               </ContainerInfo>
            </MaxWidth>
         </ContainerHeader>
         <MaxWidth>
            <ContainerForm>
               <Section>
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
               </Section>

               <Section>
                  <CreateInput
                     Svg={RxLockClosed}
                     type="password"
                     placeholder="Senha"
                     name="password"
                     id="password"
                  />

                  <CreateInput
                     Svg={RxLockClosed}
                     type="password"
                     placeholder="Senha"
                     name="password"
                     id="password"
                  />
               </Section>

               <Button>Salvar</Button>
            </ContainerForm>
         </MaxWidth>
      </>
   );
}
