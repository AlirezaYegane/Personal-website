// Common types used across the application

export interface Post {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    content: string;
}

export interface Project {
    slug: string;
    title: string;
    description: string;
    image?: string;
    url?: string;
    github?: string;
    tags: string[];
    featured: boolean;
}

export interface NarrativeEntry {
    slug: string;
    title: string;
    date: string;
    content: string;
}

// MDX Content Types

/**
 * Base content interface with common fields for all MDX content
 */
export interface BaseContent {
    id: string;
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    order?: number;
    date?: string;
}

/**
 * Project content with MDX support
 */
export interface ProjectContent extends BaseContent {
    github?: string;
    demo?: string;
    image?: string;
    featured?: boolean;
    content: string;
}

/**
 * Blog post content with MDX support
 */
export interface BlogPostContent extends BaseContent {
    author?: string;
    date: string;
    content: string;
}

/**
 * Narrative block for story sections
 */
export interface NarrativeBlock {
    id: string;
    slug: string;
    title: string;
    order: number;
    summary?: string;
    content: string;
}

