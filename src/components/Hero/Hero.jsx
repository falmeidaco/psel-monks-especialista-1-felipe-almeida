import styled from "styled-components";
import monkImg from "../../assets/monks-hero-image.svg";
import scrollImg from "../../assets/scroll.svg";

export const SSection = styled.section`
  background-color: var(--color-dark);
  border-radius: 0 0 30px 30px;
  overflow: hidden;
  position:relative;
  display:flex;
  align-items: stretch;
  min-height:600px;
  padding-top: var(--header-height);
  margin-bottom:3rem;
  @media (max-width: 768px) {
    min-height:auto;
    height: 100dvh;
    border-radius:0;
  }
`;

export const SDivCopy = styled.div`
  max-width:50%;
  padding: 0 0 0 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color:#EAE8E4;
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
    font-weight: 200;
    line-height: 2;
  }
  img {
    margin:2rem auto;
  }
  @media (max-width: 768px) {
    max-width:70%;
    padding: 0 0 0 1rem;
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

export const SDivCopyContent = styled.div`
  flex-grow:1;
  flex-shrink:0;
  display:flex;
  flex-direction: column;
  justify-content: center;
`;

export const SImage = styled.img`
  position: absolute;
  height: 100%;
  width: auto;
  right: -10%;
  top:0;
  @media (max-width: 768px) {
    left:40%;
  }
`;


export default function Hero() {
  return (
    <SSection id="hero">
      <SDivCopy>
        <SDivCopyContent>
          <h1>Lorem ipsum dolor sit amet consectetur</h1>
          <p>Lorem ipsum dolor sit amet consectetur. Semper orci adipiscing faucibus sit scelerisque quis commodo aenean viverra</p>
        </SDivCopyContent>
        <img src={scrollImg} alt="Scroll" width="80px" />
      </SDivCopy>
      <SImage src={monkImg} alt="Imagem" />
    </SSection>
  )
}