import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import PostList from './components/Post/PostList'

function App() {

  return (
    <>
      <Header />
      <Hero />
      <PostList term="geral" />
      <PostList term="destaques" />
    </>
  )
}

export default App
