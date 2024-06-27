
import { addPeople } from "../../assets"
import styles from "./dashboard.module.css"
import Modal from "../../components/Modal/modal"
import StatusDiv from "./statusDiv/statusDiv"
import { useState } from "react"
import TaskModal from "../../components/TaskModal/TaskModal"
const Dashboard = () => {
  let userDetails = sessionStorage.getItem("userDetails") ? JSON.parse(sessionStorage.getItem("userDetails") ?? "") : null

  
  const [assignOpen, setAssignOpen] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)

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

          {["Backlog", "To Do", "In Progress", "Done"].map((status: string) => <StatusDiv
            toggleTaskModal={setTaskModalOpen}
            key={status}
            title={status} />)}
        </div>
      </div>
      {assignOpen && <Modal
        open={assignOpen}
        onHandleCancel={setAssignOpen}></Modal>}

      {taskModalOpen && <TaskModal onHandleClose={setTaskModalOpen} />}
    </div>
  )
}

export default Dashboard