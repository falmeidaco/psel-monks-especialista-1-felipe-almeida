import { useState, useEffect } from "react";
import api from "../../services/api";
import Sprites from "../misc/Sprites";
import styled from "styled-components";

const FooterStyled = styled.div`
  background-color: var(--color-dark);
  color: var(--color-light);
  padding: 2rem 3rem;
  .links {
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
  }
`;

export default function Footer() {

  const [menuItens, setMenuItens] = useState([]);

  useEffect(() => {
    api.get("/menu?menu=rodape")
      .then((response) => {
        setMenuItens(response.data.menu);
      })
      .catch((error) => {
        console.error("Erro na requisição da API:", error);
      });
  }, [])
  

  return (
    <FooterStyled as="footer">
      <div>
        <Sprites id="svg-instagram" />
      </div>
      <p>Footer</p>
      <div className="links">
        {menuItens.map((item, index) => (
          <a key={index} href={item.url}>{item.title}</a>
        ))}
      </div>
    </FooterStyled>
  )
}