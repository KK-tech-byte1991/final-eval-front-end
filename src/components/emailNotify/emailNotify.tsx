
import styles from "./modal.module.css"


const EmailNotify = (props: any) => {
  

  const handleSubmit = () => {
    props.setEmailNotifyOpen(null)

  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} >&times;</span>

        <label
          htmlFor="email"
          className={styles.heading}>
          {props.emailNotifyOpen} added to the board</label>

        <br /><br />


        <br />
        <br />
        <div className={styles.buttonDiv}>

          <button

            className={styles.submitButton}
            onClick={handleSubmit}>Okay,got it!</button>
        </div>


      </div>
    </div>
  )
}

export default EmailNotify