import { TaskWithAssignee } from "~/utils/api"
import RiskCard from "../ui/risk-card"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router"
import { formatLongDate } from "~/utils/date-helper"
import { BookmarkSquareIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import StatusSelector from "../status-selector"


interface TaskItemProps {
  task: TaskWithAssignee
}

export default function TaskItem({ task }: TaskItemProps) {
  const router = useRouter()

  return (
    <div
      className=" flex items-center justify-between py-3 px-4 sm:py-7 sm:px-8 border border-[#F0F2F7] rounded-lg hover:shadow-md bg-white"
    >
      {/* TODO: Menu openning problem is set at the top */}
      <Link href={{ query: { taskId: task.id } }} shallow scroll={false} className="cursor-pointer">
        <RiskCard
          title={task.title}
          isTitleEditable={false}
          icon={<BookmarkSquareIcon className="h-9" />}
          subtitle={<span><strong>{task.assignee?.name ?? "Unassigned"} · Creation Date</strong> {formatLongDate(task.createdAt)}</span>}
        />
      </Link>

      <div className="flex border-l flex-row space-x-3 items-center">

        <div className="h-full bg-gray-200 w-[1px]" />

        <StatusSelector
          status={task.status}
          taskId={task.id}
        />

        <Link href={{ query: { taskId: task.id } }} shallow scroll={false} className="cursor-pointer">
          <ChevronRightIcon className="ml-2" />
        </Link>
      </div>
    </div>

  )
}