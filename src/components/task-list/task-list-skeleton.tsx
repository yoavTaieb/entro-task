import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import RiskCardSkeleton from "../ui/risk-card-skeleton";

const TaskListSkeleton = () => {
    return (
        <>
            <div className="flex flex-col space-y-2">
                {
                    [1, 2, 3, 4, 5].map((task) => (
                        <div
                            key={task}
                            className=" flex items-center justify-between py-3 px-4 sm:py-7 sm:px-8 border border-[#F0F2F7] rounded-lg hover:shadow-md cursor-pointer"
                        >
                            <RiskCardSkeleton />
                            <div className="flex border-l flex-row space-x-3 items-center">
                                <div className="h-full bg-gray-200 w-[1px]" />
                                <Skeleton height={6} width={20} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default TaskListSkeleton;