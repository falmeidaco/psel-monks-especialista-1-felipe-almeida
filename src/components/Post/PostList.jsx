import posts from '../../custom-data'
import Post from './Post'
import styled from "styled-components"


const SSection = styled.section`
  margin:auto 3rem;
`;

const SHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom:1rem;
`;

const SText = styled.p`
  font-size: 1.5rem;
  font-weight: 200;
  line-height: 1.5;
  margin-bottom:2rem;
`;

const SList = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap:2rem;
`;

export default function PostList() {

  return (
    <SSection>
      <SHeading>Lorem ipsum dolor sit, amet consectetur</SHeading>
      <SText>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque reprehenderit doloribus quasi quas cum nesciunt asperiores in, nostrum natus assumenda officiis perspiciatis corrupti repellendus odit placeat facilis quam! Veniam, accusamus.</SText>
      <SList>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </SList>
    </SSection>
  );
}