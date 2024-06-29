
import Sidebar from './sidebar'
import styles from "./dashboard.module.css"
import Dashboard from './dashboard'
import Settings from './Settings/settings'
import Analytics from './Analytics/analytics'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader/loader'
import Task from '../publicTask/task'
const Layout = ({ child, mode }: any) => {

    const navigate = useNavigate();

    useEffect(() => {
        mode !== "public" && !sessionStorage.getItem("userDetails") && navigate("/")

    }, [child])


    if (mode !== "public") {
        return (sessionStorage.getItem("userDetails") ? <div className={styles.container}>
            {sessionStorage.getItem("userDetails") && <Sidebar />}
            {sessionStorage.getItem("userDetails") && <div className={styles.mainContent}>{child}</div>}
            {!sessionStorage.getItem("userDetails") && <div></div>}
            {!sessionStorage.getItem("userDetails") && <Loader />}
        </div> : <Loader />

        )
    } else {
        return (<div className={styles.container}>
            <Sidebar mode="public" />
            <div className={styles.mainContent}>{child}</div>
        </div>)
    }


}

const DashboardLayout = () => <Layout child={<Dashboard />} />
const SettingsLayout = () => <Layout child={<Settings />} />
const AnalyticsLayout = () => <Layout child={<Analytics />} />
const TaskLayout = () => <Layout mode="public" child={<Task />} />

export { DashboardLayout, SettingsLayout, AnalyticsLayout, TaskLayout }