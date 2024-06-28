import { useEffect, useState } from "react"
import { arrowDown, arrowUp } from "../../../assets"
import styles from "./checklist.module.css"

const CheckList = ({ expandAll,checkListData }: any) => {
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        setExpanded(expandAll)
    }, [expandAll])


    return (
        <div className={styles.container}>
            <div className={styles.headerDiv}>
                Checklist(1/3)
                <button className={styles.expandedButton}
                    onClick={() => setExpanded(!expanded)}> {expanded ? <img src={arrowDown} /> :
                        <img src={arrowUp} />}</button>
            </div>

            {expanded && <div className={styles.taskList}>

                {checkListData.map((task: any) => (
                    <li key={task.id}>
                        {/* <input type="checkbox" checked={} /> */}
                        <label>{task.title}</label></li>))
                }
            </div>}

        </div>
    )
}

export default CheckList