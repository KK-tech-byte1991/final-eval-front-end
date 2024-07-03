
import styles from "./deleteConfirmModal.module.css"
const DeleteConfirmModel = (props: any) => {

  
    return (
        <div className={styles.modal}> <div className={styles.modalContent}>
            <span className={styles.close} >&times;</span>
            <form >
                <label
                    htmlFor="email"
                    className={styles.heading}>
                    Are you sure you want to Delete?

                </label>

                <br />


                <br />
                <br />
                <div className={styles.buttonDiv}>
                    <button
                        onClick={props.handleDelete}

                        className={styles.submitButton}>Yes,Delete</button>
                    <button
                        onClick={props.handleClose}
                        className={styles.cancelButton}>Cancel</button>

                </div>

            </form>
        </div></div>
    )
}

export default DeleteConfirmModel