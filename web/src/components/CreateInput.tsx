import { InputHTMLAttributes } from 'react';
import styled, {
   StyledComponent,
   StyledComponentProps,
} from 'styled-components';
import { IconType } from 'react-icons/lib';

import { theme } from '../theme';

const { color, font } = theme;

const Container = styled.div`
   position: relative;
   min-width: 100%;
`;

const Input = styled.input`
   width: 100%;
   height: 5.2rem;
   border-radius: 1rem;
   padding: 1.6rem 1.6rem 1.6rem 5.2rem;
   outline: none;
   background-color: ${color.secondBg};
   color: ${color.fourthBg};
   font-family: ${font.family.robotoSlab};
   line-height: ${font.lineHeight};

   :focus {
      outline: 2px solid ${color.first};
      outline-offset: 3px;
   }

   ::placeholder,
   ::-webkit-input-placeholder {
      color: ${color.second};
   }
   :-ms-input-placeholder {
      color: ${color.second};
   }
`;

const sizeSVG = 20;

const ContainerSvg = styled.div`
   position: absolute;
   left: 1.6rem;
   top: 50%;
   height: ${sizeSVG / 10}rem;
   width: ${sizeSVG / 10}rem;
   transform: translateY(-50%);
`;

interface CreateInputProps extends InputHTMLAttributes<HTMLInputElement> {
   Svg: IconType;
}

export function CreateInput({
   Svg,
   ...rest
}: CreateInputProps) {
   const yy = <input type="button" value="" />;

   return (
      <Container>
         <ContainerSvg>
            <Svg size={sizeSVG} color={color.second} />
         </ContainerSvg>
         <Input
            {...rest}
         />
      </Container>
   );
}
