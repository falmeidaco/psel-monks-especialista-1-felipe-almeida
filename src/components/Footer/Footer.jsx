import { useState, useEffect } from "react";
import api from "../../services/api";
import Sprites from "../misc/Sprites";
import styled from "styled-components";

const FooterStyled = styled.div`
  background-color: var(--color-dark);
  color: var(--color-light);
  padding: 2rem 3rem;
  border-top:1px solid var(--color-purple-light);
  display:flex;
  flex-direction: column;
  gap: 2rem;
  .links {
    display:flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;

    .text {
      font-size:1.2rem;
      text-align: center;
      font-weight: 300;
    }
  }
`;

const NavSocialStyled = styled.nav`
  --icon-size: 35px;

  display:flex;
  gap: 2rem;
  justify-content: center;

  a:hover {
    opacity: .7;
  }

  svg {
    width: var(--icon-size);
    height: var(--icon-size);
  }
`;

const NavFooterStyled = styled.nav`
  list-style: none;
  display:flex;
  gap: 2rem;
  justify-content: center;

  a {
    display:block;
    color: var(--color-light);

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Footer() {

  const [menuItens, setMenuItens] = useState([]);
  const [socialMenuItens, setSocialMenuItens] = useState([]);

  /* Carrega links de rede social */
  useEffect(() => {
    api.get("/menu?menu=social")
      .then((response) => {
        setSocialMenuItens(response.data.menu);
      })
      .catch((error) => {
        console.error("Erro na requisição da API:", error);
      });
  }, []);

  /* Carrega itens do menu do rodapé */
  useEffect(() => {
    api.get("/menu?menu=rodape")
      .then((response) => {
        setMenuItens(response.data.menu);
      })
      .catch((error) => {
        console.error("Erro na requisição da API:", error);
      });
  }, []);
  

  return (
    <FooterStyled as="footer">
      
      <NavSocialStyled>
        {socialMenuItens.map((item, index) => (
          <a key={index} href={item.url} title={item.title}>
            <Sprites id={`svg-${item.classes}`} />
          </a>
        ))}
      </NavSocialStyled>


      <div className="links">
        <p className="text">Lorem ipsum dolor sit amet</p>
        <NavFooterStyled as="ul">
          {menuItens.map((item, index) => (
            <li key={index}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </NavFooterStyled>
      </div>

    </FooterStyled>
  )
}