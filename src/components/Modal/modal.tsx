
import { useState } from "react"
import styles from "./modal.module.css"
const Modal = (props: any) => {
  const [emailId, setEmailId] = useState("")
 const  handleInputChange = (e: any) => {
    setEmailId(e.target.value)
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} >&times;</span>
        <form >
          <label
            htmlFor="email"
            className={styles.heading}>
            Add people to the board</label>

          <br /><br />
          <input
            type="email"
            id="email"
            value={emailId}
            onChange={handleInputChange}
            placeholder='Enter the email'
            className={styles.inputField}
          />

          <br />
          <br />
          <div className={styles.buttonDiv}>
            <button
              onClick={() => props.onHandleCancel(false)}
              className={styles.cancelButton}>Cancel</button>
            <button
              type="submit"
              className={styles.submitButton}>Submit</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Modal