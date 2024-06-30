
import { addPeople,  downVector } from "../../assets"
import styles from "./dashboard.module.css"
import Modal from "../../components/Modal/modal"
import StatusDiv from "./statusDiv/statusDiv"
import { useEffect, useState } from "react"
import TaskModal from "../../components/TaskModal/TaskModal"
import axiosInstance from "../../hooks/axiosInstance"
import dateConverter from "../../hooks/dateConverter"
import Popup from "../../components/Popup/popup"
const Dashboard = () => {
  let userDetails = sessionStorage.getItem("userDetails") ? JSON.parse(sessionStorage.getItem("userDetails") ?? "") : null

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [boardData, setBoardData] = useState([])
  const [boardUser, setBoardUser] = useState(null)

  const [mode, setMode] = useState("TODO")
  const [selectedTask, setSelectedTask] = useState<any>(null)

  const fetchBoardData = () => {
    axiosInstance.get("/todo/all/user/" + userDetails.id).then((res) => {
      setBoardData(res.data)
    })
  }

  const fetchBoardUser = () => {
    axiosInstance.get("/board/" + userDetails.id + "/owner").then((res) => {
      setBoardUser(res.data)
    })
  }

  useEffect(() => {
    fetchBoardData()
    fetchBoardUser()
  }, [])

  console.log(boardData, boardUser, "boardrelated---Info")
  const handleTaskClose = () => {
    setTaskModalOpen(false)
    setSelectedTask(null)
  }
  let statusData = [{ title: "Backlog", id: "BACKLOG" }, { title: "To Do", id: "TODO" }, { title: "In Progress", id: "INPROGRESS" }, { title: "Done", id: "DONE" }]
  return (
    <div className={styles.dashboardOuterDiv}>
      <div className={styles.header}>
        <h4 className={styles.dashboardNameHeading}>Welcome  {userDetails?.name} </h4>
        <p className={styles.headingDate}>
          {dateConverter(new Date()) + ", " + new Date().getFullYear()
          }          </p></div>

      <div style={{ display: "flex", alignItems: "center" }}>

        <h2 className={styles.heading}>Board &nbsp;</h2>

        <div className={styles.addPeople}>
          <button onClick={() => setAssignOpen(true)}>
            <img src={addPeople} alt="altpeople" /> &nbsp;Add People</button>
        </div>

        <button className={styles.filterButton}
          onClick={() => setPopupOpen(true)}
        >
          This week <img src={downVector} alt="down" /></button>
        <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} mode={"filter"}>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <button className={styles.optionButton}>Today</button>
            <button className={styles.optionButton} >This Week</button>
            <button className={styles.optionButton} >This Month</button>
          </div>

        </Popup>
      </div>

      <div className={styles.boardContent}>
        <div className={styles.taskBoard}>

          {statusData?.map((status: any) => <StatusDiv
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
        onHandleCancel={setAssignOpen}
        //@ts-ignore
        boardId={boardUser?._id}
        fetchBoardUser={fetchBoardUser}

      ></Modal>}

      {taskModalOpen && <TaskModal
        mode={mode}
        onHandleClose={handleTaskClose}
        fetchBoardData={fetchBoardData}
        selectedTask={selectedTask}
        boardUser={boardUser}

      />}
    </div>
  )
}

export default Dashboard