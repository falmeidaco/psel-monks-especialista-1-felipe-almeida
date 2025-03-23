import styled from "styled-components"

const LoadingStyled = styled.div`
  text-align: center;
`;

export default function Loading({ text }) {
  return (
    <LoadingStyled className="max-width">
      {text ? <p>{text}</p> : "Carregando..."}
    </LoadingStyled>
  )
}