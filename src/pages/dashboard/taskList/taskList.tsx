
import styles from "./taskList.module.css"
import { ellipsesHigh, threeDots } from '../../../assets'

const TaskList = () => {
  return (
    <div className={styles.taskBody}>
      <div className={styles.topDiv}>


        <div className={styles.priorityDiv}>
          <img src={ellipsesHigh} />
          {/* <div className={styles.initialsDiv}></div> */}

          <p className={styles.priorityLabel}> High Priority</p>
          <div className={styles.initialsDiv}>DM</div>
        </div>


        <div>
          <img src={threeDots} alt="threeDots" />
        </div>
      </div>
      <div className={styles.heroSection}>Hero Section</div>
      <div className={styles.footer}>
        <button className={styles.taskStatusButton}>15 May</button>
        <button className={styles.taskStatusButton}>To Do</button>
        <button className={styles.taskStatusButton}>In Progress</button>
        <button className={styles.taskStatusButton}>Done</button>
      </div>
    </div>
  )
}

export default TaskList