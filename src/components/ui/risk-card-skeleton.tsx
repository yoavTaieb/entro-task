import { Skeleton } from "@chakra-ui/react";

const RiskCardSkeleton = () => {
    return (
        <div className="flex flex-row items-center space-x-6">
            <div className="hidden sm:block">
                <Skeleton className="h-16 w-16" borderRadius={"lg"}/>
            </div>
            <div className="flex flex-col justify-between space-y-1">
                <Skeleton height={6} width={64} />
                <Skeleton height={4} width={64} />
            </div>

        </div>
    );
};

export default RiskCardSkeleton;