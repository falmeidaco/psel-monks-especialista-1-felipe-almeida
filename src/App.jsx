import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import PostList from './components/Post/PostList'
import PostListFeature from './components/Destaques/Destaques'
import AppBanner from './components/AppBanner/AppBanner'
import Produtos from './components/Produtos/Produtos'

function App() {

  return (
    <>
      <Header />
      <Hero />
      <Produtos term="produtos" />
      <PostList term="geral" />
      <PostListFeature term="destaques" />
      <AppBanner />
    </>
  )
}

export default App
