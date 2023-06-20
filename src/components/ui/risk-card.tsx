import { ReactNode } from "react";
import RiskCardIcon from "./risk-card-icon";
import { Input } from "@chakra-ui/react";

interface Props {
    title?: string;
    icon: React.ReactElement;
    subtitle?: React.ReactNode;
    isTitleEditable?: boolean;
    onTitleChange?: (title: string) => void;
}

const RiskCard: React.FC<Props> = (props) => {
    return (
        <div className="flex flex-row items-center space-x-6 flex-1">
            <div className="hidden sm:block">
                <RiskCardIcon icon={props.icon} />
            </div>
            <div className="flex flex-col justify-between space-y-1 flex-1">
                <Input
                    readOnly={!props.isTitleEditable}
                    onChange={(e) => props.onTitleChange!(e.currentTarget.value)}
                    className="font-semibold w-full"
                    autoFocus={props.isTitleEditable}
                    value={props.title}
                    variant='unstyled'
                    placeholder="Task Title" />
                <div className="text-[#98A2B3] text-xs">{props.subtitle}</div>
            </div>

        </div>
    );
};

export default RiskCard;