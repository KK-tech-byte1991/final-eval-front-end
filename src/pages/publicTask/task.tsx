import { useEffect, useState } from 'react'

import TaskList from '../dashboard/taskList/taskList'
import axios from 'axios'
import styles from "./task.module.css"
const Task = () => {

  const [taskData, setTaskData] = useState<any>(null)


  useEffect(() => {
    axios.get(import.meta.env.VITE_BASE_URL + "/users/task/" + window.location.pathname.split("/")[2])
      .then((res) => setTaskData(res.data))
  }, [])

  return (
    <div className={styles.container}>
      {taskData && <TaskList taskData={taskData} mode="public" />}
    </div>
  )
}

export default Task