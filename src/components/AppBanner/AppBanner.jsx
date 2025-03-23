import styled from "styled-components";
import imgAppStore from "/button-app-store.png";
import imgPlayStore from "/button-play-store.png";

export const AppBannerStyled = styled.div`
  background-color: #3C0C60;
  color: var(--color-light);
  border-radius:24px;
  padding:2.5rem;
  display:flex;
  gap:2rem;
  align-items: center;

  .text {
    flex-grow: 1;
    display:flex;
    flex-direction: column;
    gap: .5rem;
    .heading {
      font-weight: 400;
      font-size: 2.5rem;
    }
    p {
      font-size: 1.5rem;
    }
  }

  .buttons {
    flex-shrink: 0;
    flex-basis: 200px;
    display:flex;
    flex-direction: column;
    gap: .5rem;
    img {
      border-radius: 10px;
      width:100%;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap:2.5rem;
    padding: 1.5rem;
    align-items: stretch;

    .text {
      .heading {
        font-size: 1.5rem;
      }

      p {
        font-size: 1rem;
      }
    }
      
    .buttons {
      flex-basis: unset;
      
      img {
        border-radius: 15px;
      }
    }
  }
`;

export default function AppBanner() {
  return (
    <div className='max-width'>
    <AppBannerStyled as="section">
      <div className="text">
        <h2 className="heading">Lorem ipsum dolor sit amet consectetur</h2>
        <p>Lorem ipsum dolor sit amet consectetur. Semper orci adipiscing faucibus sit scelerisque quis commodo aenean viverra</p>
      </div>
      <div className="buttons">
        <a href="#">
          <img src={imgAppStore} alt="Download para iOs" />
        </a>
        <a href="#">
          <img src={imgPlayStore} alt="Google Play" />
        </a>
      </div>
    </AppBannerStyled>
    </div>
  )
}