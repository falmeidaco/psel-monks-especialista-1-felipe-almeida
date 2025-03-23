import styled from "styled-components";

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

export default function Input({ className, ...props }) {
  return <InputStyled className={className} {...props} />
}