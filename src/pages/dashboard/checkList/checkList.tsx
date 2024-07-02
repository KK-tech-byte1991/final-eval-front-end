import { useEffect, useState } from "react"
import { arrowDown, arrowUp } from "../../../assets"
import styles from "./checklist.module.css"
import axiosInstance from "../../../hooks/axiosInstance"
import { toast } from "sonner"
import checkListTitle from "../../../hooks/checkListTitle"

const CheckList = ({ expandAll, checkListData, taskData, fetchBoardData, mode }: any) => {
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        setExpanded(expandAll)
    }, [expandAll])


    const handleEditStatusCheckList = (index: number, checked: boolean) => {
        let updatedCheckList = JSON.parse(JSON.stringify(checkListData))
        let a = { title: updatedCheckList[index].title, status: checked }
        updatedCheckList[index] = a
        let taskDataUpdated = JSON.parse(JSON.stringify(taskData))
        taskDataUpdated.checkList = updatedCheckList;

        axiosInstance.put("/todo/edit/" + taskDataUpdated?._id, taskDataUpdated).then(() => {
            toast.success("Check List updated Successfully");
            fetchBoardData()
        })
    }

    console.log("dsdsdsds", mode)

    return (
        <div className={mode !== "public" ? styles.container : styles.containerPublic}>
            <div className={styles.headerDiv}>
                {checkListTitle(checkListData)}
                <button className={styles.expandedButton}
                    onClick={() => setExpanded(!expanded)}> {expanded ? <img src={arrowDown} alt="down" /> :
                        <img src={arrowUp} alt="up" />}</button>
            </div>

            {expanded && <div className={mode !== "public" ? styles.taskList : styles.taskListPublic}>

                {checkListData.map((task: any, index: number) => (
                    <li
                        key={task.id}>
                        <input
                            type="checkbox"
                            style={{
                                accentColor: '#17A2B8',
                                borderRadius: "20px"
                            }}
                            // disabled={mode == "public"}
                            checked={JSON.parse(task.status)}
                            onChange={(e) => mode !== "public" && handleEditStatusCheckList(index, e.target.checked)}
                        />
                        <label >{task.title}</label></li>))
                }
            </div>}

        </div>
    )
}

export default CheckList