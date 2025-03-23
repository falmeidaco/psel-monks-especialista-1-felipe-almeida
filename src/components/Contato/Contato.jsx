import imgFooter from "../../assets/image-footer.svg"
import styled from "styled-components"
import Form from "./Form"

const ContatoStyled = styled.div`
  background-color: var(--color-dark);

  & > div {  
    display:flex;
    gap:2.5rem;
    padding: 6rem 3rem;
  }

  .media {
    align-content: center;
    text-align: center;
  }

  .content-form {
    flex:1;
  }

  @media (max-width: 768px) {
    & > div { 
      flex-direction: column;
      padding: 2rem 1.5rem;
    }
  }
`;
export default function Contato() {
  return (
    <ContatoStyled as="section">
      <div className='max-width'>
        <div className="media">
          <img src={imgFooter} alt="Imagem" />
        </div>
        <div className="content-form">
          <Form />
        </div>
      </div>
    </ContatoStyled>
  )
}