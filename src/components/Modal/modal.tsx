
import { useState } from "react"
import styles from "./modal.module.css"
import axiosInstance from "../../hooks/axiosInstance";
import { toast } from "sonner";
import validateEmail from "../../hooks/validateEmail";

const Modal = (props: any) => {
  const [emailId, setEmailId] = useState("");

  const handleInputChange = (e: any) => {
    setEmailId(e.target.value)
  }

  const handleSubmit = () => {
    if (validateEmail(emailId)) {
      let payload = { email: emailId }

      axiosInstance.post("/board/" + props.boardId, payload)
        .then(() => {
          toast.success("User Added Successfully to the board")
          props.successCallBack();
          props.onHandleCancel(false)
        })

    } else {
      toast.error("Enter proper email")
    }


  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} >&times;</span>

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

            className={styles.submitButton}
            onClick={handleSubmit}>Submit</button>
        </div>


      </div>
    </div>
  )
}

export default Modal