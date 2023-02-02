import { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineAdd } from 'react-icons/md';

import { theme } from '../../theme';

const { color, font, border } = theme;

const TagNew = styled.div`
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
`;

const TagIonput = styled.input`
   background-color: transparent;
   width: min(11.1rem);
   font-size: ${font.size.base};
   font-family: ${font.family.roboto};
   font-weight: 400;
   color: ${color.second};
`;

const ContainerNewTag = styled.button`
   width: auto;
   height: auto;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: transparent;
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

   return (
      <TagNew>
         <TagIonput
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={'Novo marcador'}
         />
         <ContainerNewTag
            onClick={() =>
               ValidationToAddNewTag({
                  inputValue,
                  setInputValue,
                  arrayTags,
                  setArrayTags,
               })
            }
         >
            <MdOutlineAdd
               size={24}
               color={color.first}
               style={{ cursor: 'pointer' }}
            />
         </ContainerNewTag>
      </TagNew>
   );
}
