import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface NarrativeSectionProps {
    title: string;
    subtitle?: string;
    year?: string | number;
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function NarrativeSection({
    title,
    subtitle,
    year,
    children,
    className,
    delay = 0,
}: NarrativeSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay }}
            className={cn("relative pl-8 md:pl-0", className)}
        >
            <div className="md:flex md:gap-8">
                {/* Timeline (Desktop) */}
                <div className="hidden md:flex md:w-32 md:flex-col md:items-end md:border-r md:border-gray-200 md:pr-8 dark:border-gray-800">
                    {year && (
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            {year}
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-12">
                    {/* Mobile Year */}
                    {year && (
                        <div className="mb-2 md:hidden">
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                {year}
                            </span>
                        </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {title}
                    </h3>

                    {subtitle && (
                        <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                            {subtitle}
                        </p>
                    )}

                    <div className="prose prose-gray dark:prose-invert mt-4 max-w-none">
                        {children}
                    </div>
                </div>
            </div>

            {/* Timeline Dot (Desktop) */}
            <div className="absolute left-[-5px] top-1 hidden h-3 w-3 rounded-full bg-blue-600 md:left-[7.5rem] md:block dark:bg-blue-400" />

            {/* Timeline Line (Mobile) */}
            <div className="absolute left-0 top-2 h-full w-px bg-gray-200 md:hidden dark:bg-gray-800" />

            {/* Timeline Dot (Mobile) */}
            <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-blue-600 md:hidden dark:bg-blue-400" />
        </motion.div>
    );
}
