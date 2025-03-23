import { useState, useEffect } from 'react';
import api from '../../services/api';
import Destaque from './Destaque'
import styled from "styled-components"


const DestaquesStyled = styled.div`
  margin:0 3rem 3rem;

  .pinterest-style {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 150px);

    & > .title {
      font-weight: 400;
      margin-bottom:1rem;
      font-size:2.5rem;
    }

    & > p {
      font-size: 1.5rem;
      font-weight: 200;
      line-height: 1.5;
      margin-bottom:2rem;
    }


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

    
  }


  @media (max-width: 768px) {
    margin:auto 1rem;

    .pinterest-style {
      display:flex;
      flex-direction:column;

      &>.title {
        margin-bottom:.5rem;
        font-size: 1.5rem;  
      }
      & > p {
        font-size: 1rem;
        margin-bottom:1rem;
      }
    }
  }
`;

export default function PostListFeature({ term }) {

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
  }, [])

  if (posts === null) {
    return <p>Carregando...</p>;
  }

  return (
    <DestaquesStyled>
      <div className='pinterest-style'>
        <div>
          <h3 className="title">{title}</h3>
          <p>{description}</p>
        </div>
        {posts.map((post) => (
          <Destaque layout="image-only" key={post.id} post={post} />
        ))}
      </div>
    </DestaquesStyled>
  );
}