import imgFooter from "../../assets/image-footer.svg"
import styled from "styled-components"
import Form from "./Form"

const ContatoStyled = styled.div`
  background-color: var(--color-dark);
  display:flex;
  gap:2.5rem;
  padding: 6rem 3rem;

  .media {
    align-content: center;
    text-align: center;
  }

  .content-form {
    flex:1;
  }
`;
export default function Contato() {
  return (
    <ContatoStyled as="footer">
      <div className="media">
        <img src={imgFooter} alt="Imagem" />
      </div>
      <div className="content-form">
        <Form />
      </div>
    </ContatoStyled>
  )
}