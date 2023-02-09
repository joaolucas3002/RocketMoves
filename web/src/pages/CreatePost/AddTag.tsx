import { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineAdd } from 'react-icons/md';

import { theme } from '../../theme';
import { validateLinghtString } from '../../utils/validateLinghtString';

const { color, font, border } = theme;

const NewTag = styled.div`
   border-radius: ${border.radius};
   height: 5.6rem;
   display: flex;
   justify-content: center;
   line-height: ${font.lineHeight};

   align-items: center;
   font-size: ${font.size.base};
   font-family: ${font.family.roboto};
   font-weight: 400;
   border: 2px dashed ${color.second};
   color: ${color.second};

   background-color: transparent;
   width: fit-content;

   gap: 1.6rem;
   padding-inline: 1.6rem;

   :focus {
      border-color: red;
   }
`;

const TagIonput = styled.input`
   background-color: transparent;
   width: min(11.1rem);
   font-size: ${font.size.base};
   font-family: ${font.family.roboto};
   font-weight: 400;
   color: ${color.second};
`;

const size = 24;

const NewTagButton = styled.button`
   width: ${size / 10}rem;
   height: ${size / 10}rem;
   font-size: ${size / 10}rem;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: transparent;
   color: ${color.first};

   :hover , :focus{
      color: ${color.firstHover};
   }
`;

interface ValidationToAddNewTagProps {
   inputValue: string | undefined;
   setInputValue: Function;
   arrayTags: string[];
   setArrayTags: Function;
}

function ValidationToAddNewTag({
   inputValue,
   setInputValue,
   arrayTags,
   setArrayTags,
}: ValidationToAddNewTagProps) {
   const LowerInput = inputValue?.toLowerCase().trim();

   // LowerInput?.length

   LowerInput &&
      !arrayTags.includes(LowerInput) &&
      setArrayTags([...arrayTags, LowerInput]);
   setInputValue('');
}

interface AddTagProps {
   arrayTags: string[];
   setArrayTags: Function;
}

export function AddTag({ arrayTags, setArrayTags }: AddTagProps) {
   const [inputValue, setInputValue] = useState<string>('');
   const [styleFocos, setStyleFocos] = useState(`${color.second}`);

   return (
      <NewTag style={{ borderColor: styleFocos }}>
         <TagIonput
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={'Novo marcador'}
            onFocus={() => {
               setStyleFocos(`${color.firstHover}`);
            }}
            onBlur={() => {
               setStyleFocos(`${color.second}`);
            }}
         />
         <NewTagButton
            onClick={() =>
               ValidationToAddNewTag({
                  inputValue,
                  setInputValue,
                  arrayTags,
                  setArrayTags,
               })
            }
         >
            <MdOutlineAdd style={{ cursor: 'pointer' }} />
         </NewTagButton>
      </NewTag>
   );
}
