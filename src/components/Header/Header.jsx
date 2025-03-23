import monkLogo from '../../assets/monks.svg'
import styled from "styled-components";
import Sprites from '../misc/Sprites';

export const SHeader = styled.header`
  position:absolute;
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
`;

export default function Header() {
  return (
    <SHeader>
      <div>
        <a href="#">
          <Sprites id="svg-monks" />
        </a>
      </div>
      <nav>
        <ul>
          <li>
            <a href="#">Categoria 1</a>
          </li>
          <li>
            <a href="#">Categoria 2</a>
          </li>
          <li>
            <a href="#">Categoria 3</a>
          </li>
          <li>
            <a href="#">Categoria 4</a>
          </li>
        </ul>
      </nav>
    </SHeader>
  )
}