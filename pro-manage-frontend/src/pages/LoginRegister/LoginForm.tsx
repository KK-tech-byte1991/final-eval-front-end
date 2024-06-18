
import styles from "./loginfom.module.css"
import { emailIcon, lockIcon } from '../../assets';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {

  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h2>Login</h2>

      <div className={styles.inputContainer}>

        <img src={emailIcon} alt="email" />
        <input type="email" placeholder="Email" />
      </div>
      <br /><br />
      <div className={styles.inputContainer}>

        <img src={lockIcon} alt="lock" />
        <input

          type='password'
          placeholder="Password"
        />

      </div>
      <br /><br /><br />
      <div className={styles.inputContainer}>
        <button className={styles.currentFunctionButton} >Log In</button >
      </div>
      <br />
      <p className={styles.noAccountLabel}>Have no account yet?</p>
      <div className={styles.inputContainer}>
        <button className={styles.otherFunctionButton} onClick={() => navigate("/register")}>Register</button >
      </div>
    </div>
  )
}

export default LoginForm