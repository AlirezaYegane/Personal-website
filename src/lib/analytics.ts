export interface AnalyticsEvent {
    name: string;
    properties?: Record<string, unknown>;
}

export async function trackEvent(event: AnalyticsEvent): Promise<void> {
    try {
        await fetch("/api/track", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        });
    } catch (error) {
        console.error("Analytics tracking error:", error);
    }
}
