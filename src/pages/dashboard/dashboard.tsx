
import { addPeople } from "../../assets"
import styles from "./dashboard.module.css"
import Modal from "../../components/Modal/modal"
import StatusDiv from "./statusDiv/statusDiv"
import { useEffect, useState } from "react"
import TaskModal from "../../components/TaskModal/TaskModal"
import axiosInstance from "../../hooks/axiosInstance"
const Dashboard = () => {
  let userDetails = sessionStorage.getItem("userDetails") ? JSON.parse(sessionStorage.getItem("userDetails") ?? "") : null


  const [assignOpen, setAssignOpen] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [boardData, setBoardData] = useState([])
  const [mode, setMode] = useState("TODO")
  const [selectedTask, setSelectedTask] = useState<any>(null)

  const fetchBoardData = () => {

    axiosInstance.get("/todo/all/user/" + userDetails.id).then((res) => setBoardData(res.data))
  }

  useEffect(() => {
    fetchBoardData()
  }, [])

  const handleTaskClose=()=>{
    setTaskModalOpen(false)
    setSelectedTask(null)
  }
  let statusData = [{ title: "Backlog", id: "BACKLOG" }, { title: "To Do", id: "TODO" }, { title: "In Progress", id: "INPROGRESS" }, { title: "Done", id: "DONE" }]
  return (
    <div className={styles.dashboardOuterDiv}>
      <h4 className={styles.dashboardNameHeading}>Welcome  {userDetails?.name}</h4>

      <div style={{ display: "flex" }}>

        <h2 className={styles.heading}>Board &nbsp;</h2>

        <div className={styles.addPeople}>
          <button onClick={() => setAssignOpen(true)}>
            <img src={addPeople} alt="altpeople" /> &nbsp;Add People</button>
        </div>
      </div>

      <div className={styles.boardContent}>
        <div className={styles.taskBoard}>

          {statusData.map((status: any) => <StatusDiv
            toggleTaskModal={setTaskModalOpen}
            key={status.id}
            title={status.title}
            mode={status.id}
            setMode={setMode}
            fetchBoardData={fetchBoardData}
            handleEditClick={setSelectedTask}
            data={boardData.filter((data: any) => data.status == status.id)}


          />)}
        </div>
      </div>
      {assignOpen && <Modal
        open={assignOpen}
        onHandleCancel={setAssignOpen}></Modal>}

      {taskModalOpen && <TaskModal
        mode={mode}
        onHandleClose={handleTaskClose}
        succesCallBack={fetchBoardData}
        selectedTask={selectedTask}

      />}
    </div>
  )
}

export default Dashboard