
import styles from "./settings.module.css"
import { emailIcon, lockIcon, personIcon } from '../../../assets';
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
const Settings = () => {
  let userDetails = JSON.parse(sessionStorage.getItem("userDetails") || "")
  console.log("userDetails", userDetails)
  const [name, setName] = useState(userDetails.name)
  const [password, setPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [email, setEmail] = useState(userDetails.email)
  // const [passwordError, setPasswordError] = useState("")

  const handleUpdate = () => {
    axios.post(import.meta.env.VITE_BASE_URL + "/users/updateuser", { id: userDetails.id, name, password, email, oldPassword })
      .then((res: any) => {
        toast.success("User Details Updated Successfully!!!")
        console.log("hi", res.data)
        sessionStorage.setItem("userDetails", JSON.stringify(res.data))
        setPassword("")
        setOldPassword("")
      })

      .catch((err) => toast.error(err.response.data))
  }
  return (
    <div style={{ width: "40%", paddingLeft: "40px" }}>

      <h4 className={styles.heading}>Settings </h4>


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
          value={oldPassword}
          type='password'
          placeholder="Confirm Password"
          onChange={(e) => setOldPassword(e.target.value)}
        />


      </div>
      {/* <p className={styles.errorInput}>{passwordError}</p> */}
      <br /><br />
      <div className={styles.inputContainer}>

        <img src={lockIcon} alt="lock" />
        <input
          value={password}
          type='password'
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

      </div>
      <br /><br /><br />
      <div className={styles.inputContainer}>
        <button type="submit" className={styles.currentFunctionButton}
          onClick={handleUpdate}
        >Update</button >
      </div>
    </div>
  )
}

export default Settings