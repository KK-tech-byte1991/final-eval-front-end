
import Sidebar from './sidebar'
import styles from "./dashboard.module.css"
import Dashboard from './dashboard'
import Settings from './Settings/settings'
import Analytics from './Analytics/analytics'
const Layout = ({ child }: any) => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div>{child}</div>
        </div>
    )
}

const DashboardLayout = () => <Layout child={<Dashboard />} />
const SettingsLayout = () => <Layout child={<Settings />} />
const AnalyticsLayout = () => <Layout child={<Analytics />} />

export { DashboardLayout, SettingsLayout, AnalyticsLayout }