export const siteConfig = {
    name: "Alireza Yegane – AI & Anomaly Detection",
    description:
        "Personal site and narrative of an AI researcher working on ontology-aware anomaly detection, automation pipelines, and data-driven systems.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    author: {
        name: "Alireza Yegane",
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
