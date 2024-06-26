

import styles from "./logoutConfirmModal.module.css"
const LogoutConfirmModel = () => {

   
    return (
        <div className={styles.modal}> <div className={styles.modalContent}>
            <span className={styles.close} >&times;</span>
            <form >
                <label
                    htmlFor="email"
                    className={styles.heading}>
                    Are you sure you want to Logout?</label>

                <br />


                <br />
                <br />
                <div className={styles.buttonDiv}>
                    <button
                        //   onClick={() => props.onHandleCancel(false)}
                        className={styles.cancelButton}>Cancel</button>
                    <button
                        type="submit"
                        className={styles.submitButton}>Submit</button>
                </div>

            </form>
        </div></div>
    )
}

export default LogoutConfirmModel