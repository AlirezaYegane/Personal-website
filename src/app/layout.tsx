import type { Metadata } from "next";

import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { MainNav } from "@/components/layout/MainNav";
import { getDefaultMetadata } from "@/lib/seo";

import "@/styles/globals.css";

export const metadata: Metadata = getDefaultMetadata();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <AnalyticsProvider>
                    <MainNav />
                    <main className="min-h-screen">{children}</main>
                </AnalyticsProvider>
            </body>
        </html>
    );
}
