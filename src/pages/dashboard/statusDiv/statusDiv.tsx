// import React from 'react'
import styles from "./statusDiv.module.css"
import { collapse, plus } from '../../../assets'
import TaskList from '../taskList/taskList'
import { useState } from "react"
const StatusDiv = ({ title, toggleTaskModal, data }: any) => {

    const [expandAll, setExpandAll] = useState(false)

    return (
        <div className={styles.container}>
            <div className={styles.headingDiv}>
                <h3 style={{ width: "70%" }}>{title}</h3>

                <button className={styles.headerButton}><img src={plus} alt="plus" onClick={() => toggleTaskModal(true)} /></button>
                <button className={styles.headerButton} onClick={() => setExpandAll(!expandAll)}><img src={collapse} /></button>
            </div>
            <div className={styles.body}>
                {data.map((task: any) => <TaskList key={task.id} taskData={task} expandAll={expandAll} />)}
            </div>

        </div>
    )
}

export default StatusDiv