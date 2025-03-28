import { useState, useEffect } from "react";
import api from "../../services/api";
import Produto from "./Produto";
import styled from "styled-components";
import Loading from "../misc/Loading";

const ProdutosStyled = styled.div`
  display:flex;
  flex-direction: column;
  gap: 2rem;

  & > .title {
    font-weight: 400;
    font-size: 2.5rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .tags {
    display:flex;
    flex-wrap:wrap;
    gap: 1.5rem;
    justify-content: center;

    a {
      flex-shrink:0;
      padding: .5rem 2.5rem;
      display:block;
      background-color:#DFDCD5;
      color: var(--color-purple);
      font-weight:500;
      font-size:1.2rem;
      border:1px solid var(--color-purple);
      border-radius:2rem;

      @media (max-width: 768px) {
        font-size: 1rem;
        padding: .5rem 1.5rem;
      }
    }

    @media (max-width: 768px) {
      gap: 1rem;
    }
  }

  .post-list {
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;

    @media (max-width: 768px) {
      gap: 1rem;
    }
  }
  
  @media (max-width: 768px) {
    & > .title {
      font-size: 1.5rem;
    }

    .tags {
      gap: 1rem;

      a {
        font-size: 1rem;
        padding: .5rem 1.5rem;
      }
    }

    .post-list {
      gap: 1rem;
    }
  }
`;

export default function Produtos({ term }) {

  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    api.get(`/posts-by-term?term=${term}`)
      .then((response) => {
        setTitle(response.data.name);
        setPosts(response.data.posts);
        /* Carrega as categorias */
        api.get(`/tags-by-term?term=${term}`)
          .then((response) => {
            setTags(response.data.tags);
          })
          .catch((error) => {
            console.error("Erro na requisição da API:", error);
          });
      })
      .catch((error) => {
        console.error("Erro na requisição da API:", error);
      });
  }, [])

  if (posts === null) {
    return  <Loading />
  }

  return (
    <ProdutosStyled as="section" className='max-width'>
      <h2 className="title">{title}</h2>
      <div className="tags">
        {tags.map((tag, index) => (
          <a href={`#${tag.slug}`} key={index}>{tag.name}</a>
        ))}
      </div>
      <div className="post-list">
        {posts.map((post, index) => (
          <Produto key={index} post={post} />
        ))}
      </div>
    </ProdutosStyled>
  )
}