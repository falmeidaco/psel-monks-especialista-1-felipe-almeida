import styled from "styled-components";


const SPost = styled.a`
  padding:1rem;
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
    margin: 0;
    font-weight: 300;
  }
`;


export default function Post({ post }) {
  return (
    <SPost href="#">
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