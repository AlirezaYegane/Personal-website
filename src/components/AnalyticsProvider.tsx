"use client";

import { usePageTracking } from "@/lib/analytics";

interface AnalyticsProviderProps {
    children: React.ReactNode;
}

/**
 * Analytics provider component that wraps the app to enable page tracking.
 * This is a client component that uses the usePageTracking hook.
 * It renders children without any blocking or visual changes.
 */
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
    usePageTracking();
    return <>{children}</>;
}
