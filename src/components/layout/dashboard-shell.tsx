import * as React from "react"


export interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> { }

export function DashboardShell({
    children,
    className,
    ...props
}: DashboardShellProps) {
    return (
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-0" {...props}>
            {children}
        </div>
    )
}
