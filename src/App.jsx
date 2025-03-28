import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Posts from './components/Posts/Posts'
import Destaques from './components/Destaques/Destaques'
import Produtos from './components/Produtos/Produtos'
import BannerApp from './components/BannerApp/BannerApp'
import Contato from './components/Contato/Contato'
import Footer from './components/Footer/Footer.jsx'
import Sprites from './components/misc/Sprites.jsx'

function App() {

  return (
    <>
      <Sprites />
      <Header />
      <Hero />
      <Posts term="geral" />
      <Destaques term="destaques" />
      <BannerApp />
      <Produtos term="produtos" />
      <Contato />
      <Footer />
    </>
  )
}

export default App
