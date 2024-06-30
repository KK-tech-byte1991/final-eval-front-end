
import { useEffect, useState } from "react"
import styles from "./analytic.module.css"
import axiosInstance from "../../../hooks/axiosInstance"
const Analytics = () => {
  let userDetails = sessionStorage.getItem("userDetails") ? JSON.parse(sessionStorage.getItem("userDetails") ?? "") : null

  const [analyticsData, setAnalyticsData] = useState(null)

  const fetchAnalyticsData = () => {
    axiosInstance.get("/todo/all/user/" + userDetails.id + "/analytics").then((res) => {
      setAnalyticsData(res.data)
    })
  }
  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  let analyticsOne = [{ id: "BACKLOG", title: "Backlog tasks" },
  { id: "TODO", title: "To-do Tasks" },

  { id: "INPROGRESS", title: "In-Progress Tasks" },
  { id: "DONE", title: "Completed Tasks" }
  ]

  let analyticsTwo =[{id:"LOW",title:"Low Priority"},
    {id:"HIGH",title:"High Priority"},
    {id:"MODERATE",title:"Moderate Priority"},
    {id:"DUE",title:"Due Date Tasks"}
  ]

  return (
    <div style={{ width: "60%", paddingLeft: "40px" }}>
      <h4 className={styles.heading}>Analytics</h4>
      <div className={styles.mainContent}>
        <div className={styles.divOne}>
          <ul>
            {analyticsOne.map((task) => (
              <li key={task.id}>
                <div className={styles.taskItem}>  <p> {task.title}</p>
                  <p style={{ fontWeight: 600 }}>     {analyticsData?.[task.id]} </p></div>             </li>
            ))}
          </ul>
        </div>
        <div></div>

        <div className={styles.divOne}>
          <ul>
            {analyticsTwo.map((task) => (
              <li key={task.id}>
                <div className={styles.taskItem}>  <p> {task.title}</p>
                  <p style={{ fontWeight: 600 }}>      {analyticsData?.[task.id]} </p></div>             </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Analytics