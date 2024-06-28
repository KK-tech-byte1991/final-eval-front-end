
import styles from "./taskList.module.css"
import { ellipsesHigh, threeDots } from '../../../assets'
import CheckList from "../checkList/checkList"
import dateConverter from "../../../hooks/dateConverter"
import Popup from "../../../components/Popup/popup"
import { useState } from "react"
import { toast } from "sonner"
import axiosInstance from "../../../hooks/axiosInstance"

const TaskList = ({ expandAll, taskData, fetchBoardData, handleEdit }: any) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);
  const getPriority = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "High Priority";

      case "LOW":
        return "Low Priority";

      case "MEDIUM":
        return "Medium Priority";

    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Link copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleDelete = (id: string) => {
    axiosInstance.delete("/todo/delete/" + id)
      .then(() => fetchBoardData())
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
    e.dataTransfer.setData('task',JSON.stringify(taskData))

  }
  return (
    <div draggable={true} onDragStart={handleDragStart} className={styles.taskBody}>
      <div className={styles.topDiv}>


        <div className={styles.priorityDiv}>
          <button>   <img src={ellipsesHigh} alt="elipsis" /></button>
          {/* <div className={styles.initialsDiv}></div> */}

          <p className={styles.priorityLabel}> {getPriority(taskData.toDoPriority)}</p>
          <div className={styles.initialsDiv}>DM</div>
        </div>


        <div>
          <button className={styles.threeDotsButton} onClick={openPopup}><img src={threeDots} alt="threeDots" />
          </button>

          <Popup isOpen={isPopupOpen} onClose={closePopup}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <button className={styles.optionButton} onClick={() => handleEdit(taskData)}>Edit</button>
              <button className={styles.optionButton} onClick={() => copyToClipboard(window.location.origin + "/task/" + taskData._id)}>Share</button>
              <button className={styles.optionButton} onClick={() => handleDelete(taskData._id)}>Delete</button>
            </div>
          </Popup>
        </div>
      </div>

      <div className={styles.heroSection}>{taskData.toDoName}</div>

      <CheckList
        expandAll={expandAll}
        checkListData={taskData.checkList}
        taskData={taskData}
        fetchBoardData={fetchBoardData}
      />


      <div className={styles.footer}>
        <button className={styles.taskStatusButton}>{dateConverter(taskData.endTime)}</button>
        <button className={styles.taskStatusButton} onClick={() => handleStatusChange("TODO")}>To Do</button>
        <button className={styles.taskStatusButton} onClick={() => handleStatusChange("INPROGRESS")}>In Progress</button>
        <button className={styles.taskStatusButton} onClick={() => handleStatusChange("DONE")}>Done</button>
      </div>
    </div>
  )
}

export default TaskList