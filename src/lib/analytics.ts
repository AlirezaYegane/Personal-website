"use client";

import { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

export interface AnalyticsEvent {
    name: string;
    properties?: Record<string, unknown>;
}

/**
 * Track a custom analytics event.
 * Fails silently on errors to avoid blocking the main application.
 */
export async function trackEvent(event: AnalyticsEvent): Promise<void> {
    try {
        await fetch("/api/track", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        });
    } catch {
        // Fail silently - analytics should never break the app
    }
}

/**
 * Track a page visit.
 * Called automatically by usePageTracking hook.
 */
async function trackPageVisit(path: string, referrer?: string): Promise<void> {
    try {
        await fetch("/api/track", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                path,
                referrer: referrer || undefined,
            }),
        });
    } catch {
        // Fail silently - analytics should never break the app
    }
}

/**
 * Hook to track page visits on mount and route changes.
 * Only runs in the browser and fails silently on errors.
 */
export function usePageTracking(): void {
    const pathname = usePathname();
    const lastTrackedPath = useRef<string | null>(null);

    useEffect(() => {
        // Only run in browser
        if (typeof window === "undefined") return;

        // Avoid duplicate tracking for the same path
        if (pathname === lastTrackedPath.current) return;

        lastTrackedPath.current = pathname;

        // Get referrer on initial page load
        const referrer = document.referrer || undefined;

        // Track the page visit (non-blocking)
        trackPageVisit(pathname, referrer);
    }, [pathname]);
}
