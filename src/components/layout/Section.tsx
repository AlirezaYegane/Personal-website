import type { ReactNode } from "react";

export interface SectionProps {
    children: ReactNode;
    className?: string;
}

export function Section({ children, className = "" }: SectionProps) {
    return (
        <section className={`container mx-auto py-12 px-4 ${className}`}>
            {children}
        </section>
    );
}
