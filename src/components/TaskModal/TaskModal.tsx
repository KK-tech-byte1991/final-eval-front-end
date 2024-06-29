
import { useEffect, useState } from "react"
import styles from "./modal.module.css"
import { deleteIcon } from "../../assets"
import { toast } from "sonner"
import axiosInstance from "../../hooks/axiosInstance"
import checkListTitle from "../../hooks/checkListTitle"
import getPriorityEllipses from "../../hooks/getPriorityEllipses"




const TaskModal = ({ mode, succesCallBack, onHandleClose, selectedTask }: any) => {

  const [toDoName, setToDoName] = useState("")
  const [toDoPriority, setToDoPriority] = useState("")
  const [endTime, setEndTime] = useState("")
  const [createdBy, setCreatedBy] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [checkList, setCheckList] = useState([])




  useEffect(() => {
    if (selectedTask) {
      setToDoName(selectedTask.toDoName)
      setToDoPriority(selectedTask.toDoPriority)
      setEndTime(selectedTask.endTime)
      setCreatedBy(selectedTask.createdBy)
      setAssignedTo(selectedTask.assignedTo)
      setCheckList(selectedTask.checkList)
    }
  }, [selectedTask])


  const handleEditTitleCheckList = (index: number, string: string) => {
    let updatedCheckList = JSON.parse(JSON.stringify(checkList))
    let a = { title: string, status: updatedCheckList[index].status }
    updatedCheckList[index] = a
    setCheckList(updatedCheckList)


  }

  const handleEditStatusCheckList = (index: number, checked: boolean) => {
    let updatedCheckList = JSON.parse(JSON.stringify(checkList))
    let a = { title: updatedCheckList[index].title, status: checked }
    updatedCheckList[index] = a
    setCheckList(updatedCheckList)
  }
  const handleAddCheckList = () => {


    let updatedCheckList = JSON.parse(JSON.stringify(checkList))
    // let a = { title: currentCheckList, status: true }
    // currentCheckList?.length > 0 && updatedCheckList.push(a)
    // setCheckList(updatedCheckList)
    // setCurrentCheckList("")
    // setAdding(false)

    let a = { title: "", status: true }
    updatedCheckList.push(a)
    setCheckList(updatedCheckList)


  }

  const handleDelete = (index: number) => {
    let updatedCheckList = JSON.parse(JSON.stringify(checkList))
    updatedCheckList.splice(index, 1)

    setCheckList(updatedCheckList)

  }

  const handleSubmit = () => {

    if (toDoName.length == 0 || toDoPriority.length == 0 || endTime.length == 0) {
      return toast.error("Please fill all required fields")
    }
    let status = mode

    if (selectedTask?._id) {
      let payload = { toDoName, toDoPriority, endTime, createdBy, assignedTo, checkList, status }
      axiosInstance.put("/todo/edit/" + selectedTask?._id, payload).then(() => {
        toast.success("Task updated Successfully");
        succesCallBack();
        onHandleClose(false)
      })

    } else {

      let createdBy = JSON.parse(sessionStorage.getItem("userDetails") || "")?.id
      const payload = { toDoName, toDoPriority, endTime, createdBy, assignedTo, checkList, status }
      console.log("payload", payload)

      axiosInstance.post("/todo/create", payload).then(() => {
        toast.success("Task Added Successfully");
        succesCallBack();
        onHandleClose(false)
      })
    }
  }

  const [hasValue, setHasValue] = useState(false);


  useEffect(() => {
    setHasValue(endTime !== '');
  }, [endTime])

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div style={{ position: "relative", height: "100%" }}>
          <label htmlFor="checkInput" className={styles.title}>Title<span className={styles.required}>*</span></label>

          

          <input className={styles.taskTitle}
            placeholder="Enter Task Title"
            type="text" id="checkInput" value={toDoName} onChange={(e) => setToDoName(e.target.value)} />
          <br />
          <div className={styles.priorityDiv}>
            <label htmlFor="priority" className={styles.title}>Select Priority <span className={styles.required}>*</span></label>

            <button id="priority" className={styles.priorityButton}
              style={{ backgroundColor: toDoPriority == "HIGH" ? "#767575" : "white", color: toDoPriority !== "HIGH" ? "#767575" : "white" }}
              onClick={() => setToDoPriority("HIGH")}><img src={getPriorityEllipses("HIGH")} alt="prio"/> &nbsp;&nbsp;HIGH PRIORITY</button>

            <button className={styles.priorityButton}
              onClick={() => setToDoPriority("MODERATE")}
              style={{ backgroundColor: toDoPriority == "MODERATE" ? "#767575" : "white", color: toDoPriority !== "MODERATE" ? "#767575" : "white" }}
            ><img src={getPriorityEllipses("MODERATE")} alt="prio"/> &nbsp;&nbsp;MODERATE PRIORITY</button>

            <button
              className={styles.priorityButton}
              style={{ backgroundColor: toDoPriority == "LOW" ? "#767575" : "white", color: toDoPriority !== "LOW" ? "#767575" : "white" }}
              onClick={() => setToDoPriority("LOW")}><img src={getPriorityEllipses("LOW")} alt="prio"/> &nbsp;&nbsp;LOW PRIORITY</button>

          </div>
          <div className={styles.priorityDiv}>
            <label className={styles.title}>
              {checkListTitle(checkList)}
              <span className={styles.required}>*</span></label></div>




          {checkList.map((check: any, index: number) => <div
            className={styles.inputContainer}
            key={index}>

            <button className={styles.inputAdornment} onClick={() => handleDelete(index)}>
              <img src={deleteIcon} alt="delete" />
            </button>


            <input type="checkbox" checked={JSON.parse(check.status)} onChange={(e) => handleEditStatusCheckList(index, e.target.checked)} />
            <input type="text" value={check.title}
              onChange={(e) => handleEditTitleCheckList(index, e.target.value)}
              className={styles.addNewCheckListInput} placeholder="Add Task" />
          </div>)}



          <div className={styles.addNew}>
            <button onClick={handleAddCheckList} className={styles.addNewButton}>+ Add New</button></div>

          <div className={styles.footer}>
            <div className={styles.dateContainer}>
              <input
                type="date"
                value={endTime.split("T")[0]}
                onChange={(e) => { setEndTime(e.target.value) }}
                className={styles.inputField}
              />

              {!hasValue && <button className={`${styles.inputPlaceholder} ${styles.dueDateButton} ${hasValue ? styles.hasValue : ''}`}>
                Select Due Date
              </button>}
            </div>

            <button className={styles.cancelButton}
              onClick={() => onHandleClose(false)}>Cancel</button>
            <button className={styles.saveButton} onClick={handleSubmit}>Save</button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default TaskModal