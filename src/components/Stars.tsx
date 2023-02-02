import {
   MdOutlineStar,
   MdOutlineStarOutline,
   MdOutlineStarHalf,
} from 'react-icons/md';
import styled from 'styled-components';
import { theme } from '../theme';

const { font, color } = theme;

const ContainerStars = styled.section`
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
            <MdOutlineStar size={16} />
         ) : (
            <MdOutlineStarOutline size={16} />
         ),
      );
   }

   return <ContainerStars>{CreateStars(amountOfStar)}</ContainerStars>;
}
