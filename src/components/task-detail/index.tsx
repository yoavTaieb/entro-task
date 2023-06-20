import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Stack,
    Skeleton,
    Badge,
    Textarea,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from '@chakra-ui/react';
import { api } from '~/utils/api';
import RiskCard from '../ui/risk-card';
import { getStatus } from '~/utils/enum-mapper';
import { formatLongDate } from '~/utils/date-helper';
import TaskList from '../task-list/task-list';
import LinkTaskMenu from '../link-task-menu';
import RiskCardSkeleton from '../ui/risk-card-skeleton';
import { useDebouncedCallback } from "use-debounce";
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const TaskDetail = () => {
    const router = useRouter();
    const [taskId, setTaskId] = useState<string | undefined>(undefined);

    useEffect(() => {
        const { query } = router;
        const taskId = query.taskId as string;
        if (taskId) {
            setTaskId(taskId);
        }
    }, [router]);

    const handleClose = () => {
        setTaskId(undefined);
        router.replace(router.pathname, undefined, { shallow: true });
    };

    return (
        <div>
            <TaskDrawer
                taskId={taskId}
                close={handleClose}
            />
        </div>
    );
};

const TaskDrawer = (props: { taskId?: string, close: () => void }) => {

    const task = api.task.get.useQuery({ id: props.taskId }, {
        enabled: props.taskId !== undefined,
    });

    const updateDescription = api.task.updateDescription.useMutation({
        onSuccess: () => {
            task.refetch();
        }
    })

    const addLinkedTask = api.task.addLinkedTask.useMutation({
        onSuccess: () => {
            task.refetch();
        }
    });

    const descriptionDebounced = useDebouncedCallback((value) => {
        updateDescription.mutate({ id: props.taskId!, description: value })
    }, 300);

    return (
        <Drawer isOpen={props.taskId !== undefined} placement="right" onClose={props.close} size={"lg"}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody className='mt-10'>
                    {
                        (!task.data) ? (
                            <div>
                                <RiskCardSkeleton />
                                <Stack gap={6} className='mt-5'>
                                    <Skeleton height="20px" />
                                    <Skeleton height="20px" />
                                    <Skeleton height="20px" />
                                    <Skeleton height="20px" />
                                </Stack>
                            </div>
                        ) : (
                            <div className='flex flex-col space-y-6'>
                                <RiskCard
                                    title={task.data.title}
                                    subtitle={<span>Sep 10, 2022 4:30 PM</span>}
                                    icon={<PlusCircleIcon className="h-9" />}
                                />

                                <div className='w-full bg-gray-200 h-[1px]' />

                                <div className='flex flex-col space-y-12'>

                                    <div className="grid grid-cols-3 gap-5 mt-2 max-w-md" style={{ gridTemplateColumns: "90px 193px 123px" }}>
                                        <header className="text-gray-500 font-semibold text-xs">Status</header>
                                        <header className="text-gray-500 font-semibold text-xs">Date created</header>
                                        <header className="text-gray-500 font-semibold text-xs">Assignee</header>

                                        <div className='w-9'>
                                            <Badge >{getStatus(task.data.status)}</Badge>
                                        </div>

                                        <div>
                                            <Badge>{formatLongDate(task.data.createdAt)}</Badge>
                                        </div>

                                        <div>
                                            <Badge>{task.data.assignee ? task.data.assignee.name : "Unassigned"}</Badge>
                                        </div>
                                    </div>

                                    <div>
                                        <label className='text-gray-500 font-semibold text-xs'>Description</label>
                                        <Textarea
                                            defaultValue={task.data.description ?? ""}
                                            onChange={(e) => descriptionDebounced(e.target.value)}
                                            rows={4}
                                            placeholder='Add a description'
                                            size='lg'
                                            className='mt-3'
                                        />
                                    </div>


                                    <Tabs>
                                        <TabList>
                                            <Tab>Related tasks</Tab>
                                            <Tab>Watcher</Tab>
                                        </TabList>
                                        <TabPanels>
                                            <TabPanel padding={"16px 0px"} className="flex flex-col space-y-4">
                                                <TaskList tasks={task.data.following} />
                                                <div>
                                                    <LinkTaskMenu
                                                        taskToHide={[
                                                            task.data.id,
                                                            ...task.data.following.map((task) => task.id)
                                                        ]}
                                                        addLinkedTask={(selectTask) => {
                                                            addLinkedTask.mutate({
                                                                id: task.data!.id,
                                                                linkedTaskId: selectTask
                                                            })
                                                        }}
                                                    />
                                                </div>
                                            </TabPanel>
                                            <TabPanel padding={"16px 0px"} className="flex flex-col space-y-4">
                                                <TaskList tasks={task.data.followedBy} />
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>

                                </div>


                            </div>
                        )
                    }
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};


export default TaskDetail;