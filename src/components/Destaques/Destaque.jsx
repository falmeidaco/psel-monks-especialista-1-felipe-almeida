import styled from "styled-components";

const DestaquesStyled = styled.div` 
  display:block;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 1.5rem;
  }
`;

export default function Post({ post }) {
  return (
    <DestaquesStyled as="a" href={`#${post.permalink}`}>
      <img src={post.thumbnail_url} alt={`${post.title}`} />
    </DestaquesStyled>
  )
}