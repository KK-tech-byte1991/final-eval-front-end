
import styles from "./dashboard.module.css"
const Dashboard = () => {
  let userDetails = sessionStorage.getItem("userDetails") ? JSON.parse(sessionStorage.getItem("userDetails") || "") : null

  return (
    <div style={{ width: "40%", paddingLeft: "40px" }}>
      <h4 className={styles.dashboardNameHeading}>Welcome  {userDetails?.name}</h4>

      <h2 className={styles.heading}>Board</h2>
    </div>
  )
}

export default Dashboard