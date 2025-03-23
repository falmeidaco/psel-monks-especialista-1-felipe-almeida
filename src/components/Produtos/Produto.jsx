import styled, { css } from "styled-components";


const ProdutoStyled = styled.div`
  background-color:white;
  padding: 1.5rem;
  border:2px solid var(--color-purple-light);
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display:flex;
  flex-direction: column;
  gap: 1rem;
  align-items: start;

  .heading {
    display:flex;
    flex-direction: column;
    gap: .5rem;

    .title {
      font-size:1.5rem;
      font-weight:400;
  
      @media (max-width: 768px) {
        font-size: 1.2rem;
      }
    }

    .description {
      font-size: 1.2rem;
      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }

  a {
    margin:0 auto;
    display:inline-block;
    padding: .5rem 2.5rem;
    background-color: var(--color-purple-light);
    border-radius:.3rem;
    font-weight:500;
  }
`;


export default function Post({ post }) {
  return (
    <ProdutoStyled>
      <div className="heading">
        <h3 className="title">{post.title}</h3>
        <p className="description">{post.excerpt}</p>
      </div>
      <a href={`#${post.permalink}`}>Link</a>
    </ProdutoStyled>
  )
}