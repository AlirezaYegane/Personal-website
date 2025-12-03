import type { Metadata } from "next";

export interface SeoConfig {
    title: string;
    description: string;
    url?: string;
    image?: string;
    type?: "website" | "article";
}

export function generateSeo(config: SeoConfig): Metadata {
    const { title, description, url, image, type = "website" } = config;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            images: image ? [{ url: image }] : undefined,
            type,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: image ? [image] : undefined,
        },
    };
}
