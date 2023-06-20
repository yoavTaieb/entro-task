import { Button } from "@chakra-ui/react";
import { InboxStackIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const NoTaskPlaceholder = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col border border-dashed rounded-md w-full border-gray-200 items-center h-[400px] justify-center">

                <div className="p-5 bg-gray-100 rounded-full">
                    <InboxStackIcon className="h-10" />
                </div>

                <span className="font-semibold text-xl mt-5">No task created</span>
                <p className="text-gray-400 mt-2 mb-8">You don't have any task yet. Start by creating one.</p>
                <Link href={"/new"}>
                    <Button>
                        Create Task
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default NoTaskPlaceholder;