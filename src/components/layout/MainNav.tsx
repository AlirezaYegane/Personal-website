"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNav } from "@/config/navigation";

export function MainNav() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto flex h-16 items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="font-bold text-xl text-foreground hover:text-accent transition-colors"
                    >
                        Portfolio
                    </Link>
                    <div className="hidden md:flex items-center gap-6">
                        {mainNav.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-sm font-medium transition-colors hover:text-accent ${isActive
                                        ? "text-accent"
                                        : "text-muted-foreground"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile menu placeholder - can be enhanced later */}
                <div className="md:hidden">
                    <button
                        className="text-muted-foreground hover:text-accent transition-colors"
                        aria-label="Menu"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    );
}
