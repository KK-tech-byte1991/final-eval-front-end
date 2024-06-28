
import { useState } from "react"
import styles from "./modal.module.css"
import { deleteIcon } from "../../assets"
import { toast } from "sonner"
import axios from "axios"
import axiosInstance from "../../hooks/axiosInstance"
const TaskModal = (props: any) => {

  const [toDoName, setToDoName] = useState("")
  const [toDoPriority, setToDoPriority] = useState("")
  const [endTime, setEndTime] = useState("")
  const [createdBy, setCreatedBy] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [checkList, setCheckList] = useState([])

  const [currentCheckList, setCurrentCheckList] = useState("")

  const handleAddCheckList = () => {
    let updatedCheckList = JSON.parse(JSON.stringify(checkList))
    let a = { title: currentCheckList, status: true }
    currentCheckList?.length > 0 && updatedCheckList.push(a)
    setCheckList(updatedCheckList)
    setCurrentCheckList("")
    setAdding(false)
  }

  const handleDelete = (index: number) => {
    let updatedCheckList = JSON.parse(JSON.stringify(checkList))
    updatedCheckList.splice(index, 1)

    setCheckList(updatedCheckList)

  }
  const handleSubmit = () => {

    if (toDoName.length == 0 || toDoPriority.length == 0 || endTime.length == 0) {
      return toast.error("Please fill al required fields")
    }
    let status = "TODO"
    let createdBy = JSON.parse(sessionStorage.getItem("userDetails") || "")?.id
    const payload = { toDoName, toDoPriority, endTime, createdBy, assignedTo, checkList, status }
    console.log("payload", payload)

    axiosInstance.post("/todo/create", payload).then(() => {
      toast.success("Task Added Successfully");
      props.succesCallBack();
      props.onHandleClose(false)
    })

  }

  const [hasValue, setHasValue] = useState(false);
  const [adding, setAdding] = useState(false)

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div style={{ position: "relative", height: "100%" }}>
          <label htmlFor="checkInput" className={styles.title}>Title</label>

          <br /><br />

          <input className={styles.taskTitle}
            placeholder="Enter Task Title"
            type="text" id="checkInput" value={toDoName} onChange={(e) => setToDoName(e.target.value)} />
          <br />
          <div className={styles.priorityDiv}>
            <label htmlFor="priority" className={styles.title}>Select Priority <span className={styles.required}>*</span></label>

            <button id="priority" className={styles.priorityButton}
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
          {checkList.map((check: any, index: number) => <ul key={check.title}>
            {check.title}
            <button onClick={() => handleDelete(index)}><img src={deleteIcon} alt="delete" /></button></ul>)}

          {adding && <div className={styles.inputContainer}>
            <button className={styles.inputAdornment} onClick={handleAddCheckList}>
              {/* <img src={deleteIcon} alt="delete" /> */}
              add
            </button>

            <button className={styles.inputAdornment}
            // onClick={handleAddCheckList}
            >
              {/* <img src={deleteIcon} alt="delete" /> */}
            </button>

            <input type="text" value={currentCheckList}
              onChange={(e) => setCurrentCheckList(e.target.value)}
              className={styles.addNewCheckListInput} placeholder="Add Task" />
          </div>}

          <div className={styles.addNew}>
            <button onClick={() => setAdding(true)} className={styles.addNewButton}>+ Add New</button></div>

          <div className={styles.footer}>
            <div className={styles.dateContainer}>
              <input
                type="date"
                value={endTime}
                onChange={(e) => { setHasValue(e.target.value !== ''); setEndTime(e.target.value) }}
                className={styles.inputField}
              />

              {!hasValue && <button className={`${styles.inputPlaceholder} ${styles.dueDateButton} ${hasValue ? styles.hasValue : ''}`}>
                Select Due Date
              </button>}
            </div>

            <button className={styles.cancelButton}
              onClick={() => props.onHandleClose(false)}>Cancel</button>
            <button className={styles.saveButton} onClick={handleSubmit}>Save</button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default TaskModal