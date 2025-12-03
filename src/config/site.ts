export const siteConfig = {
    name: "Personal Webpage",
    description: "A modern personal webpage built with Next.js 14",
    url: "https://example.com",
    author: {
        name: "Your Name",
        email: "your.email@example.com",
        twitter: "@yourusername",
    },
    social: {
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        twitter: "https://twitter.com/yourusername",
    },
} as const;

export type SiteConfig = typeof siteConfig;
