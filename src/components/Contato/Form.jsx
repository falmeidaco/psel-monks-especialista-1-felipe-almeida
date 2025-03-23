import { useState, useEffect, use } from "react"
import api from "../../services/api"
import styled from "styled-components"

const MESSAGE_MAX_LENGTH = 500;

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

  .message-error {
    color:red;
    font-weight: 400;
  }

  .message-success {
    color:green;
    font-weight: 400;
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

  const [challengeNumber, setChallengeNumber] = useState({ n1: 0, n2: 0 });
  const [message, setMessage] = useState({
    type: "error",
    text: "",
  })
  const [submiting, setSubmiting] = useState(false)
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    challenge: ''
  });

  useEffect(() => {
    challengeFn()
  }, []);
  const challengeFn = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setChallengeNumber({ n1, n2 });
  }

  const validateChallenge = () => {
    if (challengeNumber.n1 + challengeNumber.n2 === Number(values.challenge)) {
      return true
    }
    return false
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    if (name === "challenge") {
      return
    } else if (name === "email") {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors({
          ...errors,
          [name]: null,
        })
      } else {
        setErrors({
          ...errors,
          [name]: true,
        })
      }
    } else if (name === "phone") {
      if (/^\d{10,11}$/.test(value)) {
        setErrors({
          ...errors,
          [name]: null,
        })
      } else {
        setErrors({
          ...errors,
          [name]: true,
        })
      }
    } else {
      setErrors({
        ...errors,
        [name]: value.trim().length > 2 ? null : true,
      })
    }
  }

  const validateFields = (fields) => {
    let result = false
    let _errors = errors
    for (let i = 0; i < fields.length; i++) {
      if (fields[i] in errors) {
        if (errors[fields[i]] === true) {
          result = false
          break
        } else {
          result = true
        }
      } else {
        _errors[fields[i]] = true
      }
    }
    setErrors({
      ...errors,
      _errors,
    })
    return result
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateFields(["name", "phone", "email", "message"]) ) {
      if (!validateChallenge()) {
        challengeFn();
        setMessage({
          type:"error",
          text:"Resposta incorreta."
        });
        setValues(prev => ({...prev, challenge: ''}));
        setErrors(prev => ({...prev, challenge: true}));
        return
      }

      setSubmiting(true)
      setMessage({
        type:"none",
        text:""
      });

      try {
        const response = await api.post('/new-formsubmission', values, {
          headers: {
            'Content-Type': 'application/json',
            'X-Form-Token': 'monks2025@'
          }
        });
        setValues({
          name: '',
          phone: '',
          email: '',
          message: '',
        })
        setMessage({
          type:"success",
          text:"Formulário enviado com sucesso!"
        });
      } catch (error) {
        setMessage({
          type:"error",
          text:"Erro na submissão do formulário. Tente novamente mais tarde."
        });
      } finally {
        setSubmiting(false)
      }
    } else {
      setMessage({
        type:"error",
        text:"Preencha corretamente os campos."
      });
    }
  }

  return (
    <FormStyled onSubmit={handleSubmit} as="form" action="#">

      <div className="heading">
        <h2 className="title">Lorem ipsum dolor sit amet </h2>
        <p className="text">Lorem ipsum dolor sit amet consectetur</p>
        <p className="text-required">* Campos obrigatórios</p>
      </div>
      <p className={`message-${message.type}`}>{message.text}</p>
      <fieldset className="form-fields">
        <p>
          <InputStyled value={values.name} onChange={handleChange} required placeholder="Nome" type="text" name="name" className={errors.name ? "error" : ""} />
        </p>
        <p>
          <InputStyled value={values.phone} onChange={handleChange} maxLength="11" required placeholder="Telefone" type="phone" name="phone" className={errors.phone ? "error" : ""} />
        </p>
        <p>
          <InputStyled value={values.email} onChange={handleChange} required placeholder="E-mail" type="email" name="email" className={errors.email ? "error" : ""} />
        </p>
        <p>
          <InputStyled value={values.message} onChange={handleChange} maxLength={MESSAGE_MAX_LENGTH} required placeholder="Mensagem" type="text" name="message" className={errors.message ? "error" : ""} />
        </p>
      </fieldset>

      <FormChallengeStyled>
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
          <InputStyled className={errors.challenge ? "error" : ""} name="challenge" onChange={handleChange} value={values.challenge} required maxLength="2" type="number" placeholder="Resposta" />
        </div>
      </FormChallengeStyled>

      <div className="form-submit">
        <button disabled={submiting} type="submit">{!submiting ? "Enviar" : "Enviando..."}</button>
      </div>
    </FormStyled>
  )
}