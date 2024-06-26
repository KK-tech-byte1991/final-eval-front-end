// import React from 'react'
import styles from "./statusDiv.module.css"
import { collapse, plus } from '../../../assets'
import TaskList from '../taskList/taskList'
const StatusDiv = ({ title }: any) => {
    return (
        <div className={styles.container}>
            <div className={styles.headingDiv}>
                <h3 style={{ width: "70%" }}>{title}</h3>

                <button className={styles.headerButton}><img src={plus} alt="plus" /></button>
                <button className={styles.headerButton}><img src={collapse} /></button>
            </div>
            <div className={styles.body}>
                {[1, 2, 3, 4, 5,6,7].map((task:number) => <TaskList  key={task}/>)}
            </div>

        </div>
    )
}

export default StatusDiv