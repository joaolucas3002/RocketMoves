import styled from 'styled-components';
import {
   MdOutlineStar,
   MdOutlineStarOutline,
   MdOutlineStarHalf,
} from 'react-icons/md';

import { theme } from '../theme';

const { font, color } = theme;

const sizeStars = 18;

const ContainerStars = styled.section`
   height: ${sizeStars / 10}rem;
   display: inline-block;
   color: ${color.first};
`;

interface StarsProps {
   amountOfStar: number;
}

export function Stars({ amountOfStar }: StarsProps) {
   function CreateStars(stars: number) {
      const arr = Array.from({ length: 5 }, (v, i) => i);

      return arr.map((e, index) =>
         index < stars ? (
            <MdOutlineStar key={index} size={sizeStars} />
         ) : (
            <MdOutlineStarOutline key={index} size={sizeStars} />
         ),
      );
   }

   return <ContainerStars>{CreateStars(amountOfStar)}</ContainerStars>;
}
