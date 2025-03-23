import styled from "styled-components"

export const AppBannerStyled = styled.div`
  background-color: #3C0C60;
  color: var(--color-light);
  margin: auto 3rem;
  border-radius:24px;
  padding:1rem;
  display:flex;
  gap:2rem;
  align-items: center;
  .text {
    flex-grow: 1;
  }
  .buttons {
    display:flex;
    flex-direction: column;
    gap: .5rem;
    img {
      width: 150px;
    }
  }
`;