import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  :root {
    --size-width: 1366px;
    --header-height: 80px;
    --color-dark: #2D2D2D;
    --color-light: #EAE8E4;
    --content-margin: 3rem;
  }

  * {
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  
  

  html, body {
    min-height: 100vh;
    background-color: var(--color-light);
    font-family: "Inter", sans-serif;
    font-weight: 200;
    font-optical-sizing: auto;
    font-style: normal;
  }

  a, a:visited {
    color: var(--color-dark);
    text-decoration:none;
  }

  #root {
    max-width: var(--size-width);
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    :root {
      --content-margin: 1rem;
    }
  }
`;