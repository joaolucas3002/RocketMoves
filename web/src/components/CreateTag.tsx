import styled from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';

import { theme } from '../theme';

const { color, font, border } = theme;

const Tag = styled.div`
   color: ${color.third};
   background-color: ${color.secondBg};
   border-radius: ${border.radius};
   padding: 1.6rem;
   width:fit-content;

   border-radius: ${border.radius};
   height: 5.6rem;
   display: flex;
   justify-content: center;
   align-items: center;

   font-family: ${font.family.roboto};
   font-size: ${font.size.base};
   font-weight: 400;
   line-height: ${font.lineHeight};
   text-transform: capitalize;

   gap: 1.6rem;
`;

const Propor = 24;

const Button = styled.button`
   width: ${Propor / 10}rem;
   height: ${Propor / 10}rem;
   font-size: ${Propor / 10}rem;
   color: ${color.first};
   background-color: transparent;

   :focus {
      color: ${color.firstHover};
   }
`;

interface TagProps {
   title: string;
   array: string[];
   setArray: Function;
}

export function CreateTag({ title, array, setArray }: TagProps) {
   function remuveEtementeArray() {
      const index = array.indexOf(title);

      setArray(array.filter((_, i) => i !== index));
   }

   return (
      <Tag>
         {title}
         <Button>
            <MdOutlineClose
               onClick={remuveEtementeArray}
               style={{ cursor: 'pointer' }}
            />
         </Button>
      </Tag>
   );
}
