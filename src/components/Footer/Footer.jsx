import styled from "styled-components";

const FooterStyled = styled.div`
  background-color: var(--color-dark);
  color: var(--color-light);
  padding: 2rem 3rem;
`;

export default function Footer() {
  return (
    <FooterStyled as="footer">
      <p>Footer</p>
    </FooterStyled>
  )
}