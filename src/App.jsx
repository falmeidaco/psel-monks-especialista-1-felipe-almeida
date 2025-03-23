import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import PostList from './components/Post/PostList'
import PostListFeature from './components/Post/PostListFeature'
import AppBanner from './components/AppBanner/AppBanner'

function App() {

  return (
    <>
      <Header />
      <Hero />
      <PostList term="geral" />
      <PostListFeature term="destaques" />
      <AppBanner />
    </>
  )
}

export default App
