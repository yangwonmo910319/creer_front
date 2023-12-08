import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html{
    /* font-family: 'Courier New', Courier, monospace; */
     font-family: "Noto Sans CJK KR"; 
  }

  a, button {
    cursor: pointer;
    color: white;
  }

  body {
    max-width: 1280px;
    min-width: 769px;
    margin: 0 auto;
  }
`;