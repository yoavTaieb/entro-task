import { Button, Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react"
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
                onClick={(e) => e.stopPropagation()}
                variant={"ghost"} as={Button}>
                {getStatus(status)}
            </MenuButton>
            <Portal>
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
            </Portal>
        </Menu>
    )
}

export default StatusSelector;