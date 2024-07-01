
import { addPeople, downVector } from "../../assets"
import styles from "./dashboard.module.css"
import Modal from "../../components/Modal/modal"
import StatusDiv from "./statusDiv/statusDiv"
import { useEffect, useRef, useState } from "react"
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

  const [filter, setFilter] = useState("week");
  const prevFilter = useRef("week");

  const fetchBoardData = () => {
    axiosInstance.get("/todo/all/user/" + userDetails.id + "?filter=" + filter).then((res) => {
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
  useEffect(() => {
    fetchBoardData()
  }, [filter])


  const handleTaskClose = () => {
    setTaskModalOpen(false)
    setSelectedTask(null)
  }
  let statusData = [{ title: "Backlog", id: "BACKLOG" }, { title: "To Do", id: "TODO" }, { title: "In Progress", id: "INPROGRESS" }, { title: "Done", id: "DONE" }]
  const handleprevRef = (prev: string) => {

    prevFilter.current = prev;
    return "all"
  }
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
          {filter == "today" && "Today"}{filter == "week" && "Week"}{filter == "month" && "Month"} {filter=="all" && prevFilter.current}<img src={downVector} alt="down" /></button>
        <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} mode={"filter"}>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <button className={styles.optionButton} onClick={() => { filter == "today" ? setFilter(handleprevRef) : setFilter("today"); setPopupOpen(false) }}>Today</button>
            <button className={styles.optionButton} onClick={() => { filter == "week" ? setFilter(handleprevRef) : setFilter("week"); setPopupOpen(false) }}>This Week</button>
            <button className={styles.optionButton} onClick={() => { filter == "month" ? setFilter(handleprevRef) : setFilter("month"); setPopupOpen(false) }}>This Month</button>
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