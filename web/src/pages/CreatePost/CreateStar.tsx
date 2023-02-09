import styled from 'styled-components';
import { MdOutlineStar, MdOutlineStarOutline } from 'react-icons/md';

import { theme } from '../../theme';

const { color, font, border } = theme;

const sizeStars = 32;

const ButtonStars = styled.button`
   height: ${sizeStars / 10}rem;
   width: ${sizeStars / 10}rem;
   background-color: transparent;
   cursor: pointer;

   color: ${color.first};

   :focus,
   :hover {
      color: ${color.firstHover};
   }
`;

interface StarProps {
   indexStar: number;
   setStars: Function;
}

export function CreateStar({ indexStar, setStars }: StarProps) {
   const arr = window.Array.from({ length: 5 }, (v, i) => i);

   const validatStar = (index: number) =>
      indexStar === index + 1 ? setStars(0) : setStars(index + 1);

   return (
      <>
         {arr.map((_, index) => {
            return index < indexStar ? (
               <ButtonStars key={index} onClick={() => validatStar(index)}>
                  <MdOutlineStar size={sizeStars} />
               </ButtonStars>
            ) : (
               <ButtonStars key={index} onClick={() => validatStar(index)}>
                  <MdOutlineStarOutline size={sizeStars} />
               </ButtonStars>
            );
         })}
      </>
   );
}
