import { AppBannerStyled } from "./AppBanner.style";
import imgAppStore from "../../assets/button-app-store.png";
import imgPlayStore from "../../assets/button-play-store.png";

export default function AppBanner() {
  return (
    <AppBannerStyled as="section">
      <div className="text">
        <h2>Lorem ipsum dolor sit amet consectetur</h2>
        <p>Lorem ipsum dolor sit amet consectetur. Semper orci adipiscing faucibus sit scelerisque quis commodo aenean viverra</p>
      </div>
      <div className="buttons">
        <a href="#">
          <img src={imgAppStore} alt="Download para iOs" />
        </a>
        <a href="#">
          <img src={imgPlayStore} alt="Google Play" />
        </a>
      </div>
    </AppBannerStyled>
  )
}