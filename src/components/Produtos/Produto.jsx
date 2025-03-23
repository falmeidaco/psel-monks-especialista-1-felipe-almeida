import styled, { css } from "styled-components";


const ProdutoStyled = styled.div`
  background-color:white;
  padding: 1.5rem;
  border:2px solid #DFBBFE;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display:flex;
  flex-direction: column;
  gap: 1rem;
  align-items: start;
  .heading {
    font-size:1.5rem;
    font-weight:400;
  }
  p {
    font-size: 1.2rem;
  }
  a {
    margin:0 auto;
    display:inline-block;
    padding: .5rem 2.5rem;
    background-color:#DFBBFE;
    border-radius:.3rem;
    font-weight:500;
  }
`;


export default function Post({ post }) {
  return (
    <ProdutoStyled>
      <h3 className="heading">{post.title}</h3>
      <p>{post.excerpt}</p>
      <a href={`#${post.permalink}`}>Link</a>
    </ProdutoStyled>
  )
}