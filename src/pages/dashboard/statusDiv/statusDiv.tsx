// import React from 'react'
import styles from "./statusDiv.module.css"
import { collapse, plus } from '../../../assets'
import TaskList from '../taskList/taskList'
import { useState } from "react"
import axiosInstance from "../../../hooks/axiosInstance"
import { toast } from "sonner"
const StatusDiv = ({ title, toggleTaskModal, data, setMode, mode, fetchBoardData, handleEditClick }: any) => {

    const [expandAll, setExpandAll] = useState(false)

    const handleEdit = (data: any) => {
        handleEditClick(data)
        setMode(mode);
        toggleTaskModal(true)
    }

    const handleDragOver = (e: any) => {

        e.preventDefault()
    }

    const handleDrop = (e: any) => {
        const data = JSON.parse(e.dataTransfer.getData("task"))

        data.status = mode;

        axiosInstance.put("/todo/edit/" + data?._id, data).then(() => {
            toast.success("Status updated Successfully");
            fetchBoardData()
        })
    }
    return (
        <div
            className={styles.container}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className={styles.headingDiv}>
                <h3 style={{ width: "70%" }}>{title}</h3>

                <button className={styles.headerButton} onClick={() => { setMode(mode); toggleTaskModal(true) }}><img src={plus} alt="plus" /></button>
                <button className={styles.headerButton} onClick={() => setExpandAll(!expandAll)}><img src={collapse} alt="collapse" /></button>

            </div>

            <div className={styles.body}>
                {data?.map((task: any) => <TaskList
                    key={task.id}
                    taskData={task}
                    handleEdit={handleEdit}
                    expandAll={expandAll}
                    fetchBoardData={fetchBoardData}
                />)}
            </div>

        </div>
    )
}

export default StatusDiv