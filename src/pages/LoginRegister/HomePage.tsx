
import { registerArt } from '../../assets'

import styles from "./homePage.module.css"
const HomePage = ({ mode }: any) => {
  return (
    <div className={styles.parentDiv}>
      <div className={styles.bannerDiv}>
        <div className={styles.imageContainer}>
          <div className={styles.circle}></div>
          <img src={registerArt} alt="banner" />
          <h2>Welcome aboard my friend
         </h2>
         <p> just a couple of clicks and we start</p>
        </div>
      
      </div>

      {mode}
    </div>
  )
}

export default HomePage