import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { TaskStatus } from "@prisma/client"
import { FC, useState } from "react"
import { api } from "~/utils/api"
import { getStatus } from "~/utils/enum-mapper"

const StatusSelector: FC<{
    taskId: string,
    status: TaskStatus
}> = (props) => {
    const updateStatus = api.task.updateStatus.useMutation()
    const [status, setStatus] = useState<TaskStatus>(props.status)

    return (
        <Menu>
            <MenuButton
                variant={"ghost"} as={Button}>
                {getStatus(status)}
            </MenuButton>
            <MenuList>
                {
                    Object.values(TaskStatus).map((status) => (
                        <MenuItem
                            key={status}
                            onClick={() => {
                                updateStatus.mutate({
                                    id: props.taskId,
                                    status
                                })
                                setStatus(status)
                            }}
                        >
                            {getStatus(status)}
                        </MenuItem>
                    ))
                }
            </MenuList>
        </Menu>
    )
}

export default StatusSelector;