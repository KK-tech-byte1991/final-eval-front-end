
import { useState } from "react"
import styles from "./modal.module.css"
import { deleteIcon } from "../../assets"
const TaskModal = (props: any) => {

  const [toDoName, setToDoName] = useState("")
  const [toDoPriority, setToDoPriority] = useState("")
  const [endTime, setEndTime] = useState("")
  const [createdBy, setCreatedBy] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [checkList, setCheckList] = useState([])
  const [currentCheckList, setCurrentCheckList] = useState("")
const handleAddCheckList=()=>{

}
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div style={{ position: "relative", height: "100%" }}>
          <label className={styles.title}>Title</label>
          <br /><br />
          <input className={styles.taskTitle} type="text" value={toDoName} onChange={(e) => setToDoName(e.target.value)} />
          <br />
          <div className={styles.priorityDiv}>
            <label className={styles.title}>Select Priority <span className={styles.required}>*</span></label>

            <button className={styles.priorityButton}
              style={{ backgroundColor: toDoPriority == "HIGH" ? "#767575" : "white", color: toDoPriority !== "HIGH" ? "#767575" : "white" }}
              onClick={() => setToDoPriority("HIGH")}>HIGH PRIORITY</button>

            <button className={styles.priorityButton}
              onClick={() => setToDoPriority("MODERATE")}
              style={{ backgroundColor: toDoPriority == "MODERATE" ? "#767575" : "white", color: toDoPriority !== "MODERATE" ? "#767575" : "white" }}
            >MODERATE PRIORITY</button>

            <button
              className={styles.priorityButton}
              style={{ backgroundColor: toDoPriority == "LOW" ? "#767575" : "white", color: toDoPriority !== "LOW" ? "#767575" : "white" }}
              onClick={() => setToDoPriority("LOW")}>LOW PRIORITY</button>

          </div>
          <div className={styles.priorityDiv}>
            <label className={styles.title}>CheckList (0/0) <span className={styles.required}>*</span></label>
          </div>
          {checkList.map((check) => <ul>{check}</ul>)}

          <div className={styles.inputContainer}>
            <span className={styles.inputAdornment}>
              <img src={deleteIcon}  onClick={handleAddCheckList}/>
            </span>
            {/* <input type="text" className="input-field" placeholder="Username"/> */}
            <input type="text" value={currentCheckList} onChange={(e) => setCurrentCheckList(e.target.value)} className={styles.addNewCheckListInput} placeholder="Add Task" />
          </div>

          <div className={styles.addNew}><button className={styles.addNewButton}>+ Add New</button></div>

          <div className={styles.footer}>
            <input type="date"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className={styles.dueDateButton}
              placeholder="Select Due Date"></input>


            <button className={styles.cancelButton}
              onClick={() => props.onHandleClose(false)}>Cancel</button>
            <button className={styles.saveButton}>Save</button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default TaskModal