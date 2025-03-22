import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #EAE8E4;
    font-family: Arial, Helvetica, sans-serif;
  }
  #root {
    margin: 0 auto;
    max-width: 1200px;
  }
`;