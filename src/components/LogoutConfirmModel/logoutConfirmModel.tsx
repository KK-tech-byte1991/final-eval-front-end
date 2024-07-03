

import { useNavigate } from "react-router-dom";
import styles from "./logoutConfirmModal.module.css"
const LogoutConfirmModel = (props: any) => {

    const navigate = useNavigate();
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
                        onClick={() => {
                            sessionStorage.clear();
                            navigate("/")
                        }
                        }

                        className={styles.submitButton}>Yes,Logout</button>
                    <button
                        onClick={() => props.handleClose(false)}
                        className={styles.cancelButton}>Cancel</button>

                </div>

            </form>
        </div></div>
    )
}

export default LogoutConfirmModel