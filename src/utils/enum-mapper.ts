import { TaskStatus } from "@prisma/client";

export const getStatus = (status: TaskStatus): string => {
    switch (status) {
        case TaskStatus.IN_PROGRESS:
            return "In Progress"
        case TaskStatus.DONE:
            return "Completed"
        case TaskStatus.OPEN:
            return "Open"
    }
}