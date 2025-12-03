import type { Metadata } from "next";

import { MainNav } from "@/components/layout/MainNav";

import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "Personal Webpage",
    description: "A modern personal webpage built with Next.js 14",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <MainNav />
                <main className="min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
