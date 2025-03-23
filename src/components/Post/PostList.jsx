import Post from './Post'
import styled from "styled-components"
import { useState, useEffect } from 'react';


const SSection = styled.section`
  margin:auto 3rem;
  @media (max-width: 768px) {
    margin:auto 1rem;
  }
`;

const SHeading = styled.h2`
  font-weight: 400;
  margin-bottom:1rem;
  @media (max-width: 768px) {
    margin-bottom:.5rem;
    font-size: 1.5rem;
  }
`;

const SText = styled.p`
  font-size: 1.5rem;
  font-weight: 200;
  line-height: 1.5;
  margin-bottom:2rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SList = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap:2rem;
`;

export default function PostList() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/wp-json/custom/v1/posts-by-term?term=geral')
      .then(response => response.json())
      .then(data => {
          setTitle(data.name);
          setDescription(data.description);
          setPosts(data.posts)
        }
      );
  }, []);

  return (
    <SSection>
      <SHeading>{title}</SHeading>
      <SText>{description}</SText>
      {posts === null ?
        <p>Carregando...</p>
        :
        <SList>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </SList>
      }

    </SSection>
  );
}