import { Link } from 'react-router-dom';
import { TbChevronRight, TbChevronLeft } from 'react-icons/tb';
import { theme } from '../theme';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

interface PaginationProps {
   previous: number | undefined;
   page: number;
   next: number | undefined;
   query: string;
}

const { color, font, border } = theme;

const Container = styled.section`
   font-family: ${font.family.roboto};
   width: fit-content;
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 1rem;
   margin: 0 auto;
`;

const Booton = styled(Link)`
   color: ${color.fifth};
   height: 3.5rem;
   width: 3.5rem;
   font-size: 2rem;
   background-color: #000000;
   opacity: 0.4;

   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: ${border.radius};

   :hover {
      background-color: ${color.first};
      color: white;
   }
`;

const Nost = styled.p`
   color: ${color.fifth};
   height: 3.5rem;
   width: 3.5rem;
   font-size: 2rem;
   background-color: #000000;

   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: ${border.radius};
`;

interface NextAndPreviosObjctProps {
   next: string;
   previos: string;
}

export function Pagination({ previous, page, next, query }: PaginationProps) {
   const [nextOrPreviosObjct, setNextOrPreviosObjct] =
      useState<NextAndPreviosObjctProps>({
         next: '',
         previos: '',
      });

   useEffect(() => {
      const queryParam = query ? `query=${query}&` : '';

      const previousParam = `?${queryParam}page=${previous}`;

      const nextParam = `?${queryParam}page=${next}`;

      setNextOrPreviosObjct({
         next: nextParam,
         previos: previousParam,
      });
   }, [previous, page, next, query]);

   return (
      <Container>
         {previous ? (
            <Booton to={nextOrPreviosObjct?.previos}>
               <TbChevronLeft style={{ marginRight: '.2rem' }} />
            </Booton>
         ) : (
            <span />
         )}
         <Nost>{page}</Nost>
         {next ? (
            <Booton to={nextOrPreviosObjct?.next}>
               <TbChevronRight style={{ marginLeft: '.2rem' }} />
            </Booton>
         ) : (
            <span />
         )}
      </Container>
   );
}
