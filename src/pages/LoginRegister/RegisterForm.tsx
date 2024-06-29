
import styles from "./loginfom.module.css"
import { emailIcon, lockIcon, personIcon } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import validateEmail from "../../hooks/validateEmail";
const RegisterForm = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate();

    const handleRegister = () => {

        if (!validateEmail(email)) {
            return toast.info("Please enter proper email.")
        }

        const payload = { name, password, email }
        if (password == confirmPassword) {
            axios.post(import.meta.env.VITE_BASE_URL + "/users/create", payload)
                .then(() => {
                    setName("")
                    setPassword("")
                    setConfirmPassword("")
                    setEmail("")
                    setPasswordError("")
                    toast.success("User Added Successfully!")
                })
                .catch((err) => toast.error(err.response.data))
        } else {
            setPasswordError("Confirm password doesn't match with the password.")
        }
    }
    return (
        <div className={styles.container}>

            <h2>Register</h2>
            <br />
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
                    value={password}
                    type='password'
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

            </div>
            <br /><br />
            <div className={styles.inputContainer}>

                <img src={lockIcon} alt="lock" />
                <input
                    value={confirmPassword}
                    type='password'
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />


            </div>
            <p className={styles.errorInput}>{passwordError}</p>
            <br /><br />


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
