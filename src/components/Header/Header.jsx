import { useState, useEffect } from "react";
import api from "../../services/api";
import styled from "styled-components";
import Sprites from '../misc/Sprites';

export const HeaderStyled = styled.div`
  position: absolute;
  width:100%;
  max-width: var(--max-site-width);
  height: var(--header-height);
  z-index: 20;
  display: flex;
  align-items: center;
  color: #EAE8E4;
  gap: 2rem;
  box-sizing: border-box;
  left:50%;
  transform:translateX(-50%);
  padding: 0 3rem;
  transition: background-color 0.3s ease-in-out;

  .site-logo {
    svg {
      width:120px;
      height:30px;
    }
  }

  nav {
    display: flex;
    align-items: center;
    .menu-mobile-toggle {
      --size: 30px;
      display: none;
      svg {
        width: var(--size);
        height: var(--size);
      }
    }
    ul {
      z-index: 15;
      display: flex;
      gap: 1rem;
      list-style: none;
      margin:0;
      padding:0;
      transition: transform 0.3s ease-in-out;
      a {
        color:white;
        text-decoration:none;
        display:flex;
        align-items:center;
        gap:.5rem;

        &:before {
          content: "•";
          visibility:hidden;
          font-size: 2rem;
        }

        &:hover {
          font-weight: 400;

          &:before {
            visibility:visible;
          }
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    padding: 0 1rem;

    &.menu-open {
      background-color: var(--color-dark);
      nav {
        ul {
          transform: translateY(0);
        }
      }
    }

    &.menu-close {
      nav {
        ul {
          transform: translateY(calc(-100% - var(--header-height)));
        }
      }
    }

    nav {
      .menu-mobile-toggle {
        display:block;    
      }
      ul {
        position: absolute;
        background-color: var(--color-purple-light);
        left:0;
        top:var(--header-height);
        width:100dvw;
        flex-direction: column;
        gap:0;
        padding-top:1rem;
        padding-bottom:1rem;

        a {
          font-size: 1.2rem;
          color:var(--color-dark);
          font-weight: 600;
          padding: .3rem 2rem;
          &:hover {
            font-weight: 600;
          }

          &:before {
            visibility:visible;
          }
        }
      }
    }
  }
`;

export default function Header() {

  const [menuItens, setMenuItens] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    console.log(showMenu);
    setShowMenu(prev => (!prev));
  }

  /* Carrega itens do menu do rodapé */
  useEffect(() => {
    api.get("/menu?menu=topo")
      .then((response) => {
        setMenuItens(response.data.menu);
      })
      .catch((error) => {
        console.error("Erro na requisição da API:", error);
      });
  }, []);

  return (
    <HeaderStyled className={(showMenu) ? 'menu-open' : 'menu-close'} as="header">
      <div className="site-logo">
        <a href="#">
          <Sprites id="svg-monks" />
        </a>
      </div>
      <nav>
        <a onClick={toggleMenu} className="menu-mobile-toggle" href="#">
          <Sprites id="svg-menu-mobile" />
        </a>
        <ul>
          {menuItens.map((item, index) => (
            <li key={index}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </HeaderStyled>
  )
}

/*

position: absolute;
  height: var(--header-height);
  z-index: 10;
  padding: 0 3rem;
  display: flex;
  align-items: center;
  color: #EAE8E4;
  gap: 2rem;
  box-sizing: border-box;

  nav ul {
    display: flex;
    gap: 1rem;
    list-style: none;
    margin:0;
    padding:0;
    a {
      font-weight: 200;
      color:white;
      text-decoration:none;
      display:flex;
      align-items:center;
      gap:.5rem;
      &:before {
        content: "•";
        visibility:hidden;
        font-size: 2rem;
      }
      &:hover {
        font-weight: 400;
        &:before {
          visibility:visible;
        }
      }
    }
  }
    
  @media (max-width: 768px) {
    padding: 0 1rem;
    nav {
      display: none;
    }
  }

  svg {
    max-width:140px;
    height:auto;
  }

  */