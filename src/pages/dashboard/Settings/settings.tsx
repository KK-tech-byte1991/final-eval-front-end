
import styles from "./settings.module.css"
import { emailIcon, lockIcon, personIcon } from '../../../assets';
import { useState } from "react";
const Settings = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  // const [passwordError, setPasswordError] = useState("")
  return (
    <div style={{width:"40%"}}>
      
      <h4 className={styles.heading}>Settings</h4>


      <div className={styles.inputContainer}>
        <img src={personIcon} alt="person" />
        <input
          value={name}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)} />
      </div>
      <br /><br />
      <div className={styles.inputContainer}>
        <img src={emailIcon} alt="email" />
        <input
          value={email}
          type="email" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <br /><br />
      <div className={styles.inputContainer}>

        <img src={lockIcon} alt="lock" />
        <input
          value={confirmPassword}
          type='password'
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />


      </div>
      {/* <p className={styles.errorInput}>{passwordError}</p> */}
      
      <div className={styles.inputContainer}>

        <img src={lockIcon} alt="lock" />
        <input
          value={password}
          type='password'
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

      </div>
      <br /><br /><br/>
      <div className={styles.inputContainer}>
        <button className={styles.currentFunctionButton}
        // onClick={handleRegister}
        >Update</button >
      </div>
    </div>
  )
}

export default Settings