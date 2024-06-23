
import styles from "./modal.module.css"
const modal = () => {
  return (
    <div className={styles.modal}>
    <div className={styles.modalContent}>
      <span className={styles.close} >&times;</span>
      <form >
        <label>
        Add people to the board


          <input
            type="email"
            // value={name}
            // onChange={handleInputChange}
            placeholder='Enter the email'
            className={styles.inputField}
          />
        </label>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  </div>
  )
}

export default modal