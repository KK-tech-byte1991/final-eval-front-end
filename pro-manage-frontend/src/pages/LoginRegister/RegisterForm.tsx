
import styles from "./loginfom.module.css"
import { emailIcon, lockIcon, personIcon } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
const RegisterForm = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [passwordError, setPasswordError] = useState("Confirm password doesn'tmatch with the password.")

    const navigate = useNavigate();

    const handleRegister = () => {
        const payload = { name, password, email }
        if (password == confirmPassword) {
            axios.post("http://localhost:3000/" + "users/create", payload).then(() => alert("User Added Successfully!"))
        } else {
            setPasswordError("Confirm password doesn't match with the password.")
        }
        // fetch("http://localhost:3000/"+"users/create",{method:"post",body:JSON.stringify(payload)}).then(()=>alert("User Added Successfully!"))
    }
    return (
        <div className={styles.container}>
            <h2>Register</h2>
            <br />
            <div className={styles.inputContainer}>
                <img src={personIcon} alt="person" />
                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <br /><br />
            <div className={styles.inputContainer}>
                <img src={emailIcon} alt="email" />
                <input type="email" placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <br /><br />
            <div className={styles.inputContainer}>

                <img src={lockIcon} alt="lock" />
                <input
                    type='password'
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
               

            </div>
            <p className={styles.errorInput}>{passwordError}</p>
            <br /><br />
            <div className={styles.inputContainer}>

                <img src={lockIcon} alt="lock" />
                <input
                    type='password'
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

            </div>
            <br /><br /><br />
            <div className={styles.inputContainer}>
                <button className={styles.currentFunctionButton}
                    onClick={handleRegister}
                >Register</button >
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