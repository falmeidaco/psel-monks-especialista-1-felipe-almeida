import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --max-site-width: 1366px;
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
    margin: 0 auto;

    & > section {
      margin-top:2.5rem;
      margin-bottom:4rem;
    }

    & > section:first-of-type {
      margin-top:0;
    }

    & > section:last-of-type {
      margin-bottom:0;
    }
  }

  .max-width {
    margin-left:auto;
    margin-right:auto;
    max-width: var(--max-site-width);
    padding-left:3rem;
    padding-right:3rem;
  }

  #site-sprites {
    display: none;
  }

  @media (max-width: 768px) {
    :root {
      --content-margin: 1rem;
    }

    #root {
      & > section {
        margin-top:2.rem;
        margin-bottom:2.5rem;
      }

      & > section:first-of-type {
        margin-top:0;
      }

      & > section:last-of-type {
        margin-bottom:0;
      }
      
      .max-width {
        padding-left:1rem;
        padding-right:1rem;
      }
    }
  }
`;