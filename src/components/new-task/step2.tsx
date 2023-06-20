import { api } from "~/utils/api"
import { TaskContainer } from "../layout/task-container"
import { useTaskStore } from "~/store/new-task-store"
import RiskCard from "../ui/risk-card"
import { ChevronDownIcon, PlusSquareIcon } from "@chakra-ui/icons"
import { Button, Menu, MenuButton, MenuItem, MenuList, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea } from "@chakra-ui/react"
import TaskList from "../task-list/task-list"
import LinkTaskMenu from "../link-task-menu"

const Step2Form = () => {
    const tasks = api.task.getAll.useQuery()
    const description = useTaskStore((state) => state.description)
    const setDescription = useTaskStore((state) => state.setDescription)

    const linkedTasks = useTaskStore((state) => state.linkedTasks)
    const addLinkedTask = useTaskStore((state) => state.addLinkedTask)
    const removeLinkedTask = useTaskStore((state) => state.removeLinkedTask)

    return (
        <TaskContainer>
            <div className="flex flex-col space-y-7">
                <div className="flex flex-col space-y-2">
                    <label className="text-gray-500 text-xs">Description</label>
                    <Textarea
                        value={description}
                        rows={4}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Add a more detailed description...'
                    />
                </div>

                <div>
                    <Tabs>
                        <TabList>
                            <Tab>Related tasks</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel padding={"16px 0px"} className="flex flex-col space-y-4">
                                <TaskList tasks={tasks.data?.filter(x => linkedTasks.includes(x.id)) ?? []} />
                                <div>
                                    <LinkTaskMenu
                                        taskToHide={linkedTasks.map((id) => id)}
                                        addLinkedTask={(selectTask) => {
                                            addLinkedTask(selectTask)
                                        }}
                                    />
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>


        </TaskContainer>
    )
}

export default Step2Form;