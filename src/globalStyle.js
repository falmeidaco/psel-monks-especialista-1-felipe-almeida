import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  :root {
    --header-height: 80px;
    --color-dark: #2D2D2D;
    --color-light: #EAE8E4;
  }

  * {
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  
  a, a:visited {
    color: var(--color-dark);
    text-decoration:none;
  }

  html, body {
    min-height: 100vh;
    background-color: var(--color-light);
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }

  #root {
    max-width:1600px;
    margin: 0 auto;
  }
`;