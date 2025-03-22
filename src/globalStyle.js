import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  :root {
    --header-height: 80px;
    --color-bg-dark: #2D2D2D;
    --color-bg-light: #EAE8E4;
  }

  html, body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background-color: var(--color-bg-light);
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }

  #root {
    margin: 0 auto;
  }
`;