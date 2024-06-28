import { useEffect, useState } from "react"
import { arrowDown, arrowUp } from "../../../assets"
import styles from "./checklist.module.css"
import axiosInstance from "../../../hooks/axiosInstance"
import { toast } from "sonner"

const CheckList = ({ expandAll, checkListData, taskData ,fetchBoardData}: any) => {
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        setExpanded(expandAll)
    }, [expandAll])
    console.log("cckkkkkkk", checkListData)

    const handleEditStatusCheckList = (index: number, checked: boolean) => {
        let updatedCheckList = JSON.parse(JSON.stringify(checkListData))
        let a = { title: updatedCheckList[index].title, status: checked }
        updatedCheckList[index] = a
        let taskDataUpdated = JSON.parse(JSON.stringify(taskData))
        taskDataUpdated.checkList = updatedCheckList;

        axiosInstance.put("/todo/edit/" + taskDataUpdated?._id,taskDataUpdated ).then(() => {
            toast.success("Check List updated Successfully");
            fetchBoardData()           
          })
    }
    return (
        <div className={styles.container}>
            <div className={styles.headerDiv}>
                Checklist(1/3)
                <button className={styles.expandedButton}
                    onClick={() => setExpanded(!expanded)}> {expanded ? <img src={arrowDown} /> :
                        <img src={arrowUp} />}</button>
            </div>

            {expanded && <div className={styles.taskList}>

                {checkListData.map((task: any,index:number) => (
                    <li
                        key={task.id}>
                        <input
                         type="checkbox"
                            checked={JSON.parse(task.status)}
                            onChange={(e)=>handleEditStatusCheckList(index,e.target.checked)}
                        />
                        <label>{task.title}</label></li>))
                }
            </div>}

        </div>
    )
}

export default CheckList