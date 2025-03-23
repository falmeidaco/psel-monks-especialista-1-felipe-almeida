import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  :root {
    --size-width: 1366px;
    --header-height: 80px;
    --color-dark: #2D2D2D;
    --color-light: #EAE8E4;
    --color-purple: #7D26C9;
    --color-purple-light: #DFBBFE;
    --color-purple-dark: #3C0C60;
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

  #site-sprites {
    display: none;
  }

  @media (max-width: 768px) {
    :root {
      --content-margin: 1rem;
    }
  }
`;