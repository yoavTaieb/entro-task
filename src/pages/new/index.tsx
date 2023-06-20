import RootLayout from "~/components/layout"
import { api } from "~/utils/api"
import { NextPageWithLayout } from "../_app"
import { useRouter } from "next/router"
import { TaskContainer } from "~/components/layout/task-container"
import { useTaskStore } from "~/store/new-task-store"
import Step1Form from "~/components/new-task/step1"
import Step2Form from "~/components/new-task/step2"
import { Button } from "@chakra-ui/react"
import TaskDetail from "~/components/task-detail"
import { toast } from "react-hot-toast"

const NewTask: NextPageWithLayout = () => {
    const router = useRouter()

    const store = useTaskStore((state) => state)
    const create = api.task.create.useMutation()

    const handleSumit = async () => {
        if (!store.title) {
            store.setError('title')
            toast.error('Title is required')
            return
        }
        store.startLoading()
        try {
            const res = await create.mutateAsync({
                title: store.title!,
                assignee: store.assigneeId,
                description: store.description,
                linkedTasks: store.linkedTasks,
            })
            toast.success('Task created successfully')
            router.push({
                pathname: '/',
                query: { taskId: res.id },
            }).then()
        } catch (e) {
            alert(e)
        }
        store.stopLoading()
    }

    const onLeftButtonClicked = () => {
        if (store.step == 0) {
            if (!store.title) {
                store.setError('title')
                toast.error('Title is required')
                return
            }
            store.nextStep()
        }
        else store.prevStep()
    }

    return (
        <>
            <TaskDetail />
            <TaskContainer>
                <div className="flex flex-col space-y-10">
                    <Step1Form />
                    {store.step == 1 && (<Step2Form />)}
                    {/* Bottom Actions */}
                    <div className="flex flex-row justify-end">
                        <div className="flex flex-row space-x-3 pb-6">
                            <Button
                                variant={store.step == 0 ? 'solid' : 'outline'}
                                className="w-24 h-8"
                                onClick={onLeftButtonClicked}
                                size="sm">
                                {store.step == 0 ? 'Next' : 'Back'}
                            </Button>
                            <Button
                                variant={store.step == 1 ? 'solid' : 'outline'}
                                isLoading={store.isLoading}
                                onClick={() => handleSumit()}
                                size="sm">
                                Finish
                            </Button>
                        </div>
                    </div>
                </div>
            </TaskContainer>
        </>
    )
}

export default NewTask;

NewTask.getLayout = function getLayout(page) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    )
}