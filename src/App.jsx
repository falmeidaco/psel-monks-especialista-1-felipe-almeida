import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import PostList from './components/Post/PostList'
import PostListFeature from './components/Post/PostListFeature'

function App() {

  return (
    <>
      <Header />
      <Hero />
      <PostList term="geral" />
      <PostListFeature term="destaques" />
    </>
  )
}

export default App
