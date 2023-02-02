import styled from 'styled-components';
import { MdOutlineStar, MdOutlineStarOutline } from 'react-icons/md';

import { theme } from '../../theme';

const { color, font, border } = theme;

const ButtonStars = styled.button`
   background-color: transparent;

   color: ${color.first};

   :focus {
      color: ${color.firstHover};
   }

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
               <ButtonStars onClick={() => validatStar(index)}>
                  <MdOutlineStar size={32} />
               </ButtonStars>
            ) : (
               <ButtonStars onClick={() => validatStar(index)}>
                  <MdOutlineStarOutline size={32} />
               </ButtonStars>
            );
         })}
      </>
   );
}
