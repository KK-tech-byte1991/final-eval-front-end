
import styles from "./loginfom.module.css"
import { emailIcon, lockIcon } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log("email,password", email, password)
    let payload = { email, password }
    if (email.length > 0 && password.length > 0) {
      axios.post("http://localhost:3000/users/login", payload)
    }
  }
  return (
    <div className={styles.container}>
      <h2>Login</h2>

      <div className={styles.inputContainer}>

        <img src={emailIcon} alt="email" />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email} />
      </div>
      <br /><br />
      <div className={styles.inputContainer}>

        <img src={lockIcon} alt="lock" />
        <input

          type='password'
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

      </div>
      <br /><br /><br />
      <div className={styles.inputContainer}>
        <button
          className={styles.currentFunctionButton}
          onClick={handleLogin} >Log In</button >
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