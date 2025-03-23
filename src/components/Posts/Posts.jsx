import { useState, useEffect } from 'react';
import api from '../../services/api';
import Post from './Post'
import styled from "styled-components"

const PostsStyled = styled.div`
  display:flex;
  flex-direction: column;
  gap: 2.5rem;
  
  & > .heading {
    display:flex;
    flex-direction: column;
    gap: .5rem;

    & > .title {
      font-weight: 400;
      font-size:2.5rem;
    }

    & > p {
      font-size: 1.5rem;
    }
  }

  .post-list {
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap:1.5rem;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;

    & > .heading {
      & > .title {
        font-size: 1.5rem;
      }

      & > p {
        font-size: 1rem;
      }
    }
  }
`;

export default function PostList({ term }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    api.get(`/posts-by-term?term=${term}`)
      .then((response) => {
        setTitle(response.data.name);
        setDescription(response.data.description);
        setPosts(response.data.posts)
      })
      .catch((error) => {
        console.error("Erro na requisição da API:", error);
        setPosts([]);
    });
  }, []);

  if (posts === null) {
    return <p>Carregando...</p>;
  }

  return (
    <PostsStyled as="section">
      <div className="heading">
        <h2 className='title'>{title}</h2>
        <p className='description'>{description}</p>
      </div>
      <div className="post-list">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </PostsStyled>
  );
}