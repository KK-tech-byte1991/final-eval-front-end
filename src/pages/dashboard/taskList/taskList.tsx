
import styles from "./taskList.module.css"
import { threeDots } from '../../../assets'
import CheckList from "../checkList/checkList"
import dateConverter from "../../../hooks/dateConverter"
import Popup from "../../../components/Popup/popup"
import { useState } from "react"
import { toast } from "sonner"
import axiosInstance from "../../../hooks/axiosInstance"
import getPriorityEllipses from "../../../hooks/getPriorityEllipses"
import "./toast.css"
import DeleteConfirmModel from "../../../components/DeleteConfirmModel/deleteConfirmModel"

const TaskList = ({ expandAll, taskData, fetchBoardData, handleEdit, mode }: any) => {

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false)
  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);
  const getPriority = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "High Priority";

      case "LOW":
        return "Low Priority";

      case "MODERATE":
        return "Medium Priority";

    }
  }

  const getDueColor = () => {

    if (taskData.status == "DONE") {
      return "green"
    }
    if (new Date(taskData.endTime) > new Date()) {
      return "grey"
    }
    return "red"
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Link Copied', {
          style: {
            borderRadius: '12px',
            border: '1px solid var(--Light-Sucess-border, #48C1B5)',
            background: 'var(--Light-Sucess-background, #F6FFF9)',
            boxShadow: '0px 4px 16px 0px rgba(16, 11, 39, 0.08)',
            width: "200px"
          }

        });
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
    closePopup()
  };

  const handleDelete = (id: string) => {
    axiosInstance.delete("/todo/delete/" + id)
      .then(() => { fetchBoardData() })
    setDeleteOpen(true)
    closePopup()

  }
  const handleStatusChange = (status: string) => {
    let taskDataUpdated = JSON.parse(JSON.stringify(taskData))
    taskDataUpdated.status = status;

    axiosInstance.put("/todo/edit/" + taskDataUpdated?._id, taskDataUpdated).then(() => {
      toast.success("Status updated Successfully");
      fetchBoardData()
    })
  }

  const handleDragStart = (e: any) => {
    e.dataTransfer.setData('task', JSON.stringify(taskData))

  }



  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      className={mode !== "public" ? styles.taskBody : styles.taskBodyPublic}>

      <div className={styles.topDiv}>

        <div className={styles.priorityDiv}>
          <img src={getPriorityEllipses(taskData?.toDoPriority)} alt="elipsis" />
          {/* <div className={styles.initialsDiv}></div> */}

          <p className={styles.priorityLabel}> {getPriority(taskData.toDoPriority)}</p>
          {mode !== "public" && <div className={styles.initialsDiv}>{taskData.assignedTo?.substring(0, 2)?.toUpperCase()}</div>}
        </div>


        <div>
          {mode !== "public" && <button className={styles.threeDotsButton} onClick={openPopup}><img src={threeDots} alt="threeDots" />
          </button>}

          <Popup isOpen={isPopupOpen} onClose={closePopup}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <button className={styles.optionButton} onClick={() => { handleEdit(taskData); closePopup() }}>Edit</button>
              <button className={styles.optionButton} onClick={() => copyToClipboard(window.location.origin + "/task/" + taskData._id)}>Share</button>
              <button className={styles.optionButtonDelete} onClick={() => setDeleteOpen(true)}>Delete</button>
            </div>
          </Popup>
        </div>
      </div>
      {deleteOpen && <DeleteConfirmModel
        handleDelete={() => handleDelete(taskData._id)}
        handleClose={() => setDeleteOpen(false)}
      />}
      <div className={styles.heroSection} title={taskData.toDoName.length > 20 ? taskData.toDoName : undefined}>{taskData.toDoName}</div>

      <CheckList
        expandAll={expandAll}
        checkListData={taskData.checkList}
        taskData={taskData}
        fetchBoardData={fetchBoardData}
        mode={mode}
      />


      {mode !== "public" ? <div className={styles.footer}>
        <button className={styles.taskStatusButton} style={{ backgroundColor: getDueColor(), color: "white" }}>{dateConverter(taskData.endTime)}</button>
        <button className={styles.taskStatusButton} onClick={() => handleStatusChange("TODO")}>To Do</button>
        <button className={styles.taskStatusButton} onClick={() => handleStatusChange("INPROGRESS")}>In Progress</button>
        <button className={styles.taskStatusButton} onClick={() => handleStatusChange("DONE")}>Done</button>
      </div> : <div className={styles.footerPublic}>

        {taskData.endTime.length > 0 && <p>Due Date</p>} &nbsp;&nbsp;{taskData.endTime.length > 0 && <button className={styles.taskStatusButton} style={{ backgroundColor: "red", color: "white" }}>{dateConverter(taskData.endTime)}</button>}
      </div>}

    </div>
  )
}

export default TaskList