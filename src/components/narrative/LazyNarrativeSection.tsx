"use client";

import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

// Lazy load the NarrativeSection component to code-split framer-motion
const NarrativeSection = dynamic(
    () =>
        import("./NarrativeSection").then((mod) => ({
            default: mod.NarrativeSection,
        })),
    {
        ssr: false,
        loading: () => (
            <div className={cn("relative pl-8 md:pl-0 animate-pulse")}>
                <div className="md:flex md:gap-8">
                    <div className="hidden md:flex md:w-32 md:flex-col md:items-end md:border-r md:border-gray-200 md:pr-8 dark:border-gray-800">
                        <div className="h-4 w-12 bg-gray-200 rounded dark:bg-gray-800" />
                    </div>
                    <div className="flex-1 pb-12">
                        <div className="h-6 w-3/4 bg-gray-200 rounded dark:bg-gray-800 mb-2" />
                        <div className="h-4 w-1/2 bg-gray-200 rounded dark:bg-gray-800 mb-4" />
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-200 rounded dark:bg-gray-800" />
                            <div className="h-4 w-5/6 bg-gray-200 rounded dark:bg-gray-800" />
                        </div>
                    </div>
                </div>
            </div>
        ),
    }
);

export { NarrativeSection as LazyNarrativeSection };
