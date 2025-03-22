import monkLogo from '../../assets/monks.svg'
import styled from "styled-components";

export const SHeader = styled.header`
  display: flex;
  background-color: #2D2D2D;
  color: #EAE8E4;
`;

export default function Header() {
  return (
    <SHeader>
      <div>
        <img src={monkLogo} alt="Monk Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <a href="#">Link 1</a>
          </li>
        </ul>
      </nav>
    </SHeader>
  )
}