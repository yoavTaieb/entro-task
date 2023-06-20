import { api } from "~/utils/api"
import { TaskContainer } from "../layout/task-container"
import { useTaskStore } from "~/store/new-task-store"
import RiskCard from "../ui/risk-card"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, Image, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { formatLongDate } from "~/utils/date-helper"


const Step1Form = () => {
    const users = api.user.getAll.useQuery()

    const title = useTaskStore((state) => state.title)
    const setTitle = useTaskStore((state) => state.setTitle)

    const errors = useTaskStore((state) => state.errors)

    const assignee = useTaskStore((state) => state.assigneeId)
    const setAssignee = useTaskStore((state) => state.setAssigneeId)

    return (
        <div className="flex flex-row justify-between items-center border-b border-gray-300 py-6 space-x-3">
            <RiskCard
                title={title}
                isTitleEditable={true}
                onTitleChange={(v) => { setTitle(v) }}
                titleError={errors.find((e) => e === 'title') !== undefined}
                subtitle={<span>{formatLongDate(new Date())}</span>}
                icon={<PlusCircleIcon className="h-9" />}
            />
            <div className="flex flex-row space-x-0 items-center">
                <label className="text-gray-400 font-medium">Assign to</label>
                <Menu>
                    <MenuButton variant="" as={Button} rightIcon={<ChevronDownIcon />}>
                        {assignee ? users.data?.find((user) => user.id === assignee)?.name : 'Unassigned'}
                    </MenuButton>
                    <MenuList>
                        {
                            users.data?.map((user) => (
                                <MenuItem
                                    key={user.id}
                                    minH='48px'
                                    onClick={(v) => {
                                        setAssignee(user.id)
                                    }}>
                                    <Image
                                        boxSize='2rem'
                                        borderRadius='full'
                                        src={user.ava}
                                        alt='Fluffybuns the destroyer'
                                        mr='12px'
                                    />
                                    <span className="font-semibold">{user.name}</span>
                                </MenuItem>
                            ))
                        }
                    </MenuList>
                </Menu>
            </div>
        </div>

    )
}

export default Step1Form;