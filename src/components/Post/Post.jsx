import styled from "styled-components";


const SPost = styled.a`
  padding:1rem;
  background-color:white;
  border-radius:10px;
  padding: 1rem;
  display:flex;
  flex-direction:column;
  gap:1rem;
  img {
    width: 100%;
  }
`;

const SPostText = styled.div`
  display:flex;
  flex-direction:column;
  gap:.5rem;
  h2 {
    font-size: 1.5rem;
    margin-bottom: 0;
    font-weight: 400;
  }
  p {
    margin: 0;
    font-weight: 300;
  }
`;


export default function Post({ post }) {
  return (
    <SPost href="#">
      <div className="media">
        <img src={post.media} alt="Imagem" />
      </div>
      <SPostText className="text">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </SPostText>
    </SPost>
  )
}