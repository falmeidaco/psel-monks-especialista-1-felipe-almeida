import styled, { css } from "styled-components";


const SPost = styled.a`
  ${(props) => {
    switch (props.$layout) {
      case "image-only":
        return css`
          display:flex;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          .media {
            width: 100%;
            height: 100%;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
          }
          .text {
            display:none;
          }
        `;
      default:
        return css`
          padding: 1rem;
          background-color:white;
          border-radius:10px;
          padding: .5rem .5rem 1rem;
          display:flex;
          flex-direction:column;
          gap:.5rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          img {
            border-radius: 8px;
            width: 100%;
          }
      `;
    }
  }}
`;

SPost.defaultProps = {
  layout: "default"
}

const SPostText = styled.div`
  display:flex;
  flex-direction:column;
  gap:.2rem;
  padding:0 .5rem;
  h3 {
    font-size: 1.5rem;
    font-weight: 400;
  }
  p {
    font-size: 1.2rem;
    margin: 0;
    font-weight: 300;
  }
  @media (max-width: 768px) {
    h3 {
      font-size: 1.2rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;


export default function Post({ post, layout }) {
  return (
    <SPost $layout={(layout) ? layout : "default"} href="#">
      <div className="media">
        <img src={post.thumbnail_url} alt="Imagem do post" />
      </div>
      <SPostText className="text">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
      </SPostText>
    </SPost>
  )
}