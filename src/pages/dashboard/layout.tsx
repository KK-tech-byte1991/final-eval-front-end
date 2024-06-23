
import Sidebar from './sidebar'
import styles from "./dashboard.module.css"
import Dashboard from './dashboard'
import Settings from './Settings/settings'
import Analytics from './Analytics/analytics'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader/loader'
const Layout = ({ child }: any) => {

    const navigate = useNavigate();

    useEffect(() => {
        !sessionStorage.getItem("userDetails") && navigate("/")

    }, [])

    return (
        sessionStorage.getItem("userDetails") ? <div className={styles.container}>
            {sessionStorage.getItem("userDetails") && <Sidebar />}
            {sessionStorage.getItem("userDetails") && <div className={styles.mainContent}>{child}</div>}
            {!sessionStorage.getItem("userDetails") && <div></div>}
            {!sessionStorage.getItem("userDetails") && <Loader />}
        </div> : <Loader />
    )
}

const DashboardLayout = () => <Layout child={<Dashboard />} />
const SettingsLayout = () => <Layout child={<Settings />} />
const AnalyticsLayout = () => <Layout child={<Analytics />} />

export { DashboardLayout, SettingsLayout, AnalyticsLayout }