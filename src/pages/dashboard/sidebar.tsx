
import styles from "./sidebar.module.css"
import { database, codesandbox, layout, settings, logout } from "../../assets"
import { Link, useNavigate } from "react-router-dom"
const Sidebar = () => {
  const labels = [
    { title: "Board", link: "/dashboard", icon: layout },
    { title: "Analytics", link: "/analytics", icon: database },
    { title: "Settings", link: "/settings", icon: settings }
  ]

  const navigate = useNavigate();
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.brandDiv}>

        <div className={styles.iconContainer}>
          <img src={codesandbox} alt="brand" />
        </div>
        <div className={styles.brandName}>
          <p>   Pro Manage</p>
        </div>
      </div>
      {
        labels.map((label: any) => <Link to={label.link} style={{ textDecoration: 'none' }}
          key={label.title}
          className={styles.labelDiv}
        ><div className={styles.iconContainer}>
            <img src={label.icon} alt={label.title} />
          </div><div>
            <p>   {label.title}</p>
          </div>
        </Link >)
      }
      <button className={styles.logoutDiv}
        onClick={() => {
          sessionStorage.clear();
          navigate("/")
        }

        }
      >

        <div className={styles.iconContainer}>
          <img src={logout} alt="logout" />
        </div>
        <div className={styles.logoutLabelDiv}>
          <p>   Log out</p>
        </div>
      </button>
    </div>
  )
}

export default Sidebar