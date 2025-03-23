import styled from "styled-components"

const FormStyled = styled.div`
  background-color: var(--color-light);
  padding: 1.5rem;
  border-radius: 1rem;
  display:flex;
  flex-direction: column;
  gap: 1.5rem;

  .heading {
    .title {
      font-size: 2.5rem;
      font-weight: 400;
      margin-bottom: .5rem;
    }

    .text {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .text-required {
      font-size: 1rem;
    }
  }

  fieldset {
    border: none;
  }

  .form-fields {
    display: flex;
    flex-wrap: wrap;
    gap:1rem;

    p {
      flex-shrink: 0;
      flex-grow: 1;
      flex-basis: calc(50% - 1rem);
    }
  }

  .form-submit {
    text-align: center;

    button[type="submit"] {
      cursor: pointer;
      display:inline-block;
      margin:0 auto;
      font-family: inherit;
      font-size: 1rem;
      padding: .5rem 2.5rem;
      background-color: var(--color-purple-light);
      border-radius: .3rem;
      font-weight: 500;
      border: 0;
    }
  }
  
  
  @media (max-width: 768px) {
    .heading {
      .title {
        font-size: 1.5rem;
      }

      .text {
        font-size: 1rem;
      }
    }

    .form-fields {
      flex-direction: column;
    }

    .form-submit {
      button[type="submit"] {
      }
    }
  }
`

const InputStyled = styled.input`
  width: 100%;
  border:2px solid white;
  padding: .4rem .8rem;
  font-size: 1.2rem;
  font-family: inherit;
  font-weight: 200;
  border-radius: .5rem;

  &:focus {
    outline:none;
    border-color: var(--color-purple);
  }

  &::placeholder {
    color: var(--color-dark);
    opacity: .5;
  }

  &.error {
    border-color: red;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FormChallengeStyled = styled.div`
  display:flex;
  gap:3rem;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 400;

  .challenge-n {
    padding: .3rem 1.2rem;
    background-color: rgba(0,0,0,.05);
    border-radius:5px;
    font-weight: 300;

    span {
      font-weight: 500;
      color: var(--color-purple);
      font-size: 1.2rem;
      display:inline-block;
    }
  }

  .challenge-answer {
    flex:1;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap:1rem;
    .text {
      font-size:1.2rem;
      flex-basis: 100%;
    }
    .challenge-answer {
      flex-grow: 1;
      flex-shrink: 0;
    }
  }
`

export default function Form() {
  return (
    <FormStyled as="form" action="#">

      <div className="heading">
        <h2 className="title">Lorem ipsum dolor sit amet </h2>
        <p className="text">Lorem ipsum dolor sit amet consectetur</p>
        <p className="text-required">* Lorem ipsum dolor sit amet consectetur</p>
      </div>

      <fieldset className="form-fields">
        <p>
          <InputStyled required placeholder="Campo 1" type="text" name="field1" />
        </p>
        <p>
          <InputStyled required placeholder="Campo 2" type="text" name="field2" />
        </p>
        <p>
          <InputStyled required placeholder="Campo 3" type="text" name="field3" />
        </p>
        <p>
          <InputStyled required placeholder="Campo 4" type="text" name="field4" />
        </p>
      </fieldset>

      <FormChallengeStyled>
        <div className="text">
          Verificação de segurança
        </div>
        <div className="challenge-n">
          <span>123</span> + <span>456</span>
        </div>
        <div>
          =
        </div>
        <div className="challenge-answer">
          <InputStyled type="text" />
        </div>
      </FormChallengeStyled>

      <div className="form-submit">
        <button type="submit">Submit</button>
      </div>
    </FormStyled>
  )
}