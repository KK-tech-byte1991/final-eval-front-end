import { useState } from "react"
import { arrowDown, arrowUp } from "../../../assets"
import styles from "./checklist.module.css"

const CheckList = () => {
    const [expanded, setExpanded] = useState(false)
    return (
        <div className={styles.container}>
            <div className={styles.headerDiv}>
                Checklist(1/3)
                <button className={styles.expandedButton}
                    onClick={() => setExpanded(!expanded)}> {expanded ? <img src={arrowDown} /> :
                        <img src={arrowUp} />}</button>
            </div>
            {expanded && <div className={styles.taskList}>

                {["Task 3 to be Done on Hight Priority", "Task 3 to be Done on Hight Priority", "Task 3 to be Done on Hight Priority","Task 3 to be Done on Hight Priority", "Task 3 to be Done on Hight Priority", "Task 3 to be Done on Hight Priority"].map((task: string) => (
                    <li>{task}</li>))
                }
            </div>}

        </div>
    )
}

export default CheckList