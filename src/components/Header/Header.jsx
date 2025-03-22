import monkLogo from '../../assets/monks.svg'
import styled from "styled-components";

export const SHeader = styled.header`
  background-color:rgba(0,0,0,.1);
  width:100%;
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
`;

export default function Header() {
  return (
    <SHeader>
      <div>
        <img src={monkLogo} alt="Monk Logo" title='Monk Agencia' />
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