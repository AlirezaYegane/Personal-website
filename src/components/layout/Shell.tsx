import type { ReactNode } from "react";

export interface ShellProps {
    children: ReactNode;
    title?: string;
    description?: string;
    className?: string;
}

export function Shell({ children, title, description, className = "" }: ShellProps) {
    return (
        <div className={`container mx-auto py-8 space-y-8 ${className}`}>
            {(title || description) && (
                <div className="space-y-2">
                    {title && (
                        <h1 className="text-4xl font-bold tracking-tight text-foreground">
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className="text-lg text-muted-foreground max-w-3xl">
                            {description}
                        </p>
                    )}
                </div>
            )}
            {children}
        </div>
    );
}
