import styled from "styled-components";
import monkImg from "../../assets/monks-hero-image.svg";

export const SSection = styled.section`
  background-color: var(--color-bg-dark);
  // background: var(--color-bg-dark) url('public/monks-hero-image.svg') right center no-repeat;
  background-size: cover;
  color:#EAE8E4;
  padding: 0 3rem;
  padding-top: var(--header-height);
  height: calc(100dvh - var(--header-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  position:relative;
  overflow:hidden;
  border-radius: 0 0 30px 30px;
`;

export const SImage = styled.img`
  position: absolute;
  right: 0;
  transform: translateX(20%);
  top: 0;
  height: 100%;
`;

export default function Hero() {
  return (
    <SSection id="hero">
      <div>
        <h1>Lorem ipsum dolor sit amet consectetur</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero ea animi laborum voluptate fugit ab rerum ad quae, eum, molestiae quas asperiores veritatis iure, sequi tenetur minima dolore repellat ipsum!</p>
      </div>
      <SImage src={monkImg} alt="Imagem" />
    </SSection>
  )
}