import styled, { css } from "styled-components";


const PostStyled = styled.a`
  padding: .5rem .5rem 1rem;
  background-color:white;
  border-radius:10px;
  display:flex;
  flex-direction:column;
  gap:.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  .media {
    img {
      border-radius: 8px;
      width: 100%;
    }
  }

  .title {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: .5rem;
  }

  .description {
    font-size: 1.2rem;
    margin: 0;
    font-weight: 300;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 1.2rem;
    }

    .description {
      font-size: 1rem;
    }
  }
`;

export default function Post({ post }) {
  return (
    <PostStyled as="a" href={`#${post.permalink}`}>
      {(post.thumbnail_url.trim() !== "") ? 
      <div className="media">
        <img src={post.thumbnail_url} alt="Imagem do post" />
      </div> 
      : ""}
      <div>
        <h3 className="title">{post.title}</h3>
        <p className="description">{post.excerpt}</p>
      </div>
    </PostStyled>
  )
}