import { useState, forwardRef, useImperativeHandle } from "react"
import styled from "styled-components"
import Input from "./Input"

const ChallengeStyled = styled.div`
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

const Challenge = forwardRef((props, ref) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [challengeNumber, setChallengeNumber] = useState({
    n1: Math.floor(Math.random() * 10),
    n2: Math.floor(Math.random() * 10)
  })
  
  const handleChange = (e) => {
    setValue(e.target.value);
  }
  
  const refresh = () => {
    setChallengeNumber({
      n1: Math.floor(Math.random() * 10),
      n2: Math.floor(Math.random() * 10)
    })
  }

  const reset = () => {
    setValue('')
  }
  
  const validate = (refresh) => {
    const result = challengeNumber.n1 + challengeNumber.n2 === Number(value);
    setError(!result)
    return result
  }

  useImperativeHandle(ref, () => ({
    validate, refresh, reset
  }));
  
  return (
    <ChallengeStyled>
      <div className="text">
        Verificação de segurança
      </div>
      <div className="challenge-n">
        <span>{challengeNumber.n1}</span> + <span>{challengeNumber.n2}</span>
      </div>
      <div>
        =
      </div>
      <div className="challenge-answer">
        <Input className={error ? "error" : ""} name="challenge" onChange={handleChange} value={value || ''} maxLength="2" required type="number" placeholder="Resposta" />
      </div>
    </ChallengeStyled>
  )
})

export default Challenge