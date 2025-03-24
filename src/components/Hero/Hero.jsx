import styled from "styled-components";
import monkImg from "../../assets/monks-hero-image.svg";
import Sprites from "../misc/Sprites";

export const HeroStyled = styled.div`
  background-color: var(--color-dark);
  min-height:600px;
  border-radius: 0 0 30px 30px;
  display:flex;
  align-items: stretch;
  padding-right: 0rem;

  .text {
    align-content: center;
    color:#EAE8E4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top:5rem;
    padding-bottom:2rem;
    .copy {
      flex-grow: 1;
      align-content: center;
      h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
      p {
        font-size: 1.5rem;
        line-height: 1.5;
      }
    }
    .scroll {
      text-align: center;
      svg {
        width: 100px;
      }
    }
  }

  .media {
    border-bottom-right-radius: 30px;
    overflow: hidden;
    position: relative;
    flex-basis: 500px;
    flex-shrink: 0;
    z-index: 0;
    img {
      left: 0;
      position: absolute;
      height: 100%;
    }
  }

  @media (max-width: 768px) {
    min-height:unset;
    border-radius:0;
    position:relative;
    overflow:hidden;
    .text {
      position:relative;
      z-index:10;
      min-height: 500px;
      max-width: 50dvw;
      align-items: center;
      .copy {
        h1 {
          font-size: 1.5rem;
        }
        p {
          font-size: 1rem;
        }
      }
      .scroll {
        svg {
          width:60px;
          height:60px;
        }
      }
    }
    .media {
      position: absolute;
      height: 100%;
      width: 100%;
      top:0;
      right:-40%;
      flex-basis: 100px;
    }
  }
`;

export default function Hero() {
  return (
    <HeroStyled as="section" className="max-width">
      <div className="text">
        <div className="copy">
          <h1>Lorem ipsum dolor sit amet consectetur</h1>
          <p>Lorem ipsum dolor sit amet consectetur. Semper orci adipiscing faucibus sit scelerisque quis commodo aenean viverra</p>
        </div>
        <div className="scroll">
          <Sprites id="svg-scroll" />
        </div>
      </div>
      <div className="media">
        <img src={monkImg} alt="Imagem" />
      </div>
    </HeroStyled>
  )
}