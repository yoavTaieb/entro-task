import { ReactNode } from "react";

interface TaskContainerProps {
    children: ReactNode;
}

export const TaskContainer: React.FC<TaskContainerProps> = ({ children }) => {
    return (
        <div className="w-full max-w-3xl bg-[#F7F9FC] px-3 sm:px-8 rounded-md">
            {children}
        </div>
    );
};