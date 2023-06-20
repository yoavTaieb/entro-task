import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons"
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { useMemo } from "react"
import { api } from "~/utils/api"


interface LinkTaskMenuProps {
    addLinkedTask: (taskId: string) => void,
    taskToHide: string[]
}

const LinkTaskMenu = (props: LinkTaskMenuProps) => {

    const tasks = api.task.getAll.useQuery()

    const filteredTasks = useMemo(() => {
        return tasks.data?.filter(x => !props.taskToHide.includes(x.id))
    }, [tasks.data, props.taskToHide])

    return (
        <Menu>
            <MenuButton variant={"ghost"} as={Button} colorScheme="blue" leftIcon={<AddIcon />}>
                Link to other tasks
            </MenuButton>
            <MenuList>
                {
                    filteredTasks?.length === 0 && (
                        <MenuItem>
                            No tasks to link
                        </MenuItem>
                    )
                }
                {
                    filteredTasks?.map((task) => (
                        <MenuItem
                            key={task.id}
                            onClick={(v) => { props.addLinkedTask(task.id) }}
                        >
                            {task.title}
                        </MenuItem>
                    ))
                }
            </MenuList>
        </Menu>
    )
}

export default LinkTaskMenu;