import  { createGlobalStyle } from 'styled-components'
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
   *{
      margin:0;
      border: none;
      padding:0;
      outline: none;
      box-sizing:border-box;
   }
   html {
      font-size: 62.5%;
      width: 100%;
      height: min(100%, 100vh);
   }
   body {
   font-size: 1.6rem;
   width: 100%;
   height: 100%;
   background: ${theme.color.firstBg};
}
`

