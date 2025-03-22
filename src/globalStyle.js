import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  :root {
    --header-height: 80px;
  }

  html, body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #EAE8E4;
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }
  #root {
    margin: 0 auto;
  }
`;