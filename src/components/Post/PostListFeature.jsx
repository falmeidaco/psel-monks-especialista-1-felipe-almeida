import Post from './Post'
import styled from "styled-components"
import { useState, useEffect } from 'react';


const SSection = styled.section`
  margin:0 3rem 3rem;
  @media (max-width: 768px) {
    margin:auto 1rem;
  }
`;

const SHeading = styled.h2`
  font-weight: 400;
  margin-bottom:1rem;
  font-size:2.5rem;
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
    margin-bottom:1rem;
  }
`;

const SList = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap:2rem;
`;

const SListPinterest = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 150px);
  a:nth-child(1) {
    grid-row: 1 / 2;
  }
  a:nth-child(2) {
    grid-row: 2 / 5;
  }
  a:nth-child(3) {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
  }
  a:nth-child(4) {
    grid-column: 2 / 3;
    grid-row: 3 / 5;
  }
  @media (max-width: 768px) {
    display:flex;
    flex-direction:column;
  }
`;

export default function PostListFeature({ term }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/wp-json/custom/v1/posts-by-term?term=${term}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        setTitle(data.name);
        setDescription(data.description);
        setPosts(data.posts)
      }
      ).catch(error => {
        setTitle('Conteúdo não disponível');
        setPosts([]);
      }
      );
  }, []);

  return (
    <SSection>
      {posts === null ?
        <p>Carregando...</p>
        :
        <SListPinterest>
          <div>
            <SHeading>{title}</SHeading>
            <SText>{description}</SText>
          </div>
          {posts.map((post) => (
            <Post layout="image-only" key={post.id} post={post} />
          ))}
        </SListPinterest>
      }
    </SSection>
  );
}