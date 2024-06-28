
import styles from "./taskList.module.css"
import { ellipsesHigh, threeDots } from '../../../assets'
import CheckList from "../checkList/checkList"
import dateConverter from "../../../hooks/dateConverter"

const TaskList = ({ expandAll, taskData }: any) => {

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
  return (
    <div className={styles.taskBody}>
      <div className={styles.topDiv}>


        <div className={styles.priorityDiv}>
          <img src={ellipsesHigh} alt="elipsis" />
          {/* <div className={styles.initialsDiv}></div> */}

          <p className={styles.priorityLabel}> {getPriority(taskData.toDoPriority)}</p>
          <div className={styles.initialsDiv}>DM</div>
        </div>


        <div>
          <img src={threeDots} alt="threeDots" />
        </div>
      </div>
      <div className={styles.heroSection}>{taskData.toDoName}</div>

      <CheckList expandAll={expandAll}  checkListData={taskData.checkList}/>


      <div className={styles.footer}>
        <button className={styles.taskStatusButton}>{dateConverter(taskData.endTime)}</button>
        <button className={styles.taskStatusButton}>To Do</button>
        <button className={styles.taskStatusButton}>In Progress</button>
        <button className={styles.taskStatusButton}>Done</button>
      </div>
    </div>
  )
}

export default TaskList