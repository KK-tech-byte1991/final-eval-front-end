
import styles from "./loginfom.module.css"
import { emailIcon, lockIcon,personIcon } from '../../assets';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {

    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <h2>Register</h2>
<br />
            <div className={styles.inputContainer}>
                <img src={personIcon} alt="person" />
                <input type="text" placeholder="Name" />
            </div>
<br/><br/>
            <div className={styles.inputContainer}>
                <img src={emailIcon} alt="email" />
                <input type="email" placeholder="Email" />
            </div>

            <br /><br />
            <div className={styles.inputContainer}>

                <img src={lockIcon} alt="lock" />
                <input
                    type='password'
                    placeholder="Confirm Password"
                />

            </div>

            <br /><br />
            <div className={styles.inputContainer}>

                <img src={lockIcon} alt="lock" />
                <input
                    type='password'
                    placeholder="Password"
                />

            </div>
            <br /><br /><br />
            <div className={styles.inputContainer}>
                <button className={styles.currentFunctionButton} >Register</button >
            </div>
            <br />
            <p className={styles.noAccountLabel}>Have an account ?</p>
            <div className={styles.inputContainer}>
                <button className={styles.otherFunctionButton} onClick={() => navigate("/login")}>Login</button >
            </div>
        </div>
    )
}

export default RegisterForm