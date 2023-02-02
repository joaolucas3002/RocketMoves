import { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons/lib';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../theme';

const { font, color } = theme;

export const TextLink = styled.button`
   color: ${color.first};
   font-size: ${font.size.base};
   font-weight: 400;
   line-height: ${font.lineHeight};
   font-family: ${font.family.robotoSlab};
   text-decoration: none;
   width: max-content;
   display: flex;
   align-items: center;
   background-color: transparent;
   gap: 0.8rem;

   :focus {
      text-decoration: underline;
   }

   :hover {
      text-decoration: underline;
      cursor: pointer;
   }
`;

export function ButtonHistory({
   children,
   ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
   const navigate = useNavigate();
   const goBack = () => navigate(-1);

   return (
      <TextLink onClick={goBack} {...rest}>
         {children}
      </TextLink>
   );
}
