import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export interface SeoConfig {
    title: string;
    description?: string;
    url?: string;
    image?: string;
    type?: "website" | "article";
}

/**
 * Generate base SEO metadata using siteConfig defaults.
 * Can be overridden with page-specific values.
 */
export function generateSeo(config: SeoConfig): Metadata {
    const {
        title,
        description = siteConfig.description,
        url = siteConfig.url,
        image,
        type = "website",
    } = config;

    const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;

    return {
        title: fullTitle,
        description,
        metadataBase: new URL(siteConfig.url),
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: siteConfig.name,
            images: image ? [{ url: image }] : undefined,
            type,
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: image ? [image] : undefined,
        },
    };
}

/**
 * Generate page-specific metadata with consistent title formatting.
 * Use for individual pages like About, Projects, etc.
 */
export function generatePageMetadata(
    title: string,
    description?: string,
    options?: Partial<SeoConfig>
): Metadata {
    return generateSeo({
        title,
        description: description ?? siteConfig.description,
        ...options,
    });
}

/**
 * Get the default site metadata for the root layout.
 */
export function getDefaultMetadata(): Metadata {
    return {
        title: {
            default: siteConfig.name,
            template: `%s | ${siteConfig.name}`,
        },
        description: siteConfig.description,
        metadataBase: new URL(siteConfig.url),
        openGraph: {
            title: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.url,
            siteName: siteConfig.name,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: siteConfig.name,
            description: siteConfig.description,
        },
    };
}
