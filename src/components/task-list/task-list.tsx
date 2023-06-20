import { FC } from "react"
import { TaskWithAssignee } from "~/utils/api"
import TaskItem from "./task-item"
import TaskDetail from "../task-detail"

interface TaskItemProps {
    tasks: TaskWithAssignee[]
}
const TaskList = (props: TaskItemProps) => {
    return (
        <>
            <div className="flex flex-col space-y-2">
                {
                    props.tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))
                }
            </div>
        </>
    )
}

export default TaskList;