import fs from "fs/promises";
import path from "path";

import matter from "gray-matter";

import type {
    ProjectContent,
    BlogPostContent,
    NarrativeBlock,
} from "./types";

// Content directories
const CONTENT_DIR = path.join(process.cwd(), "src", "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");
const BLOG_DIR = path.join(CONTENT_DIR, "blog");
const NARRATIVE_DIR = path.join(CONTENT_DIR, "narrative");

/**
 * Interface for parsed MDX file
 */
interface ParsedMdxFile<T = Record<string, unknown>> {
    frontmatter: T;
    content: string;
    slug: string;
}

/**
 * Parse an MDX file and extract frontmatter and content
 */
async function parseMdxFile<T = Record<string, unknown>>(
    filePath: string,
    slug: string
): Promise<ParsedMdxFile<T>> {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
        frontmatter: data as T,
        content: content.trim(),
        slug,
    };
}

/**
 * Get all MDX files from a directory
 */
async function getMdxFiles(directory: string): Promise<string[]> {
    try {
        const files = await fs.readdir(directory);
        return files.filter((file) => file.endsWith(".mdx"));
    } catch (error) {
        console.error(`Error reading directory ${directory}:`, error);
        return [];
    }
}

// ============================================================================
// PROJECT LOADERS
// ============================================================================

/**
 * Get all projects sorted by order
 */
export async function getAllProjects(): Promise<ProjectContent[]> {
    const files = await getMdxFiles(PROJECTS_DIR);

    const projects = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace(/\.mdx$/, "");
            const filePath = path.join(PROJECTS_DIR, file);
            const { frontmatter, content } = await parseMdxFile<{
                title: string;
                summary: string;
                tags?: string[];
                order?: number;
                github?: string;
                demo?: string;
                image?: string;
                featured?: boolean;
                date?: string;
            }>(filePath, slug);

            return {
                id: slug,
                slug,
                title: frontmatter.title || "Untitled Project",
                summary: frontmatter.summary || "",
                tags: frontmatter.tags || [],
                order: frontmatter.order ?? 999,
                date: frontmatter.date,
                github: frontmatter.github,
                demo: frontmatter.demo,
                image: frontmatter.image,
                featured: frontmatter.featured ?? false,
                content,
            } satisfies ProjectContent;
        })
    );

    // Sort by order ascending
    return projects.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(
    slug: string
): Promise<ProjectContent | null> {
    try {
        const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
        const { frontmatter, content } = await parseMdxFile<{
            title: string;
            summary: string;
            tags?: string[];
            order?: number;
            github?: string;
            demo?: string;
            image?: string;
            featured?: boolean;
            date?: string;
        }>(filePath, slug);

        return {
            id: slug,
            slug,
            title: frontmatter.title || "Untitled Project",
            summary: frontmatter.summary || "",
            tags: frontmatter.tags || [],
            order: frontmatter.order,
            date: frontmatter.date,
            github: frontmatter.github,
            demo: frontmatter.demo,
            image: frontmatter.image,
            featured: frontmatter.featured ?? false,
            content,
        } satisfies ProjectContent;
    } catch (error) {
        console.error(`Error loading project ${slug}:`, error);
        return null;
    }
}

// ============================================================================
// BLOG POST LOADERS
// ============================================================================

/**
 * Get all blog posts sorted by date (newest first)
 */
export async function getAllPosts(): Promise<BlogPostContent[]> {
    const files = await getMdxFiles(BLOG_DIR);

    const posts = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace(/\.mdx$/, "");
            const filePath = path.join(BLOG_DIR, file);
            const { frontmatter, content } = await parseMdxFile<{
                title: string;
                summary: string;
                date: string;
                tags?: string[];
                author?: string;
                order?: number;
            }>(filePath, slug);

            return {
                id: slug,
                slug,
                title: frontmatter.title || "Untitled Post",
                summary: frontmatter.summary || "",
                tags: frontmatter.tags || [],
                date: frontmatter.date || new Date().toISOString(),
                author: frontmatter.author,
                order: frontmatter.order,
                content,
            } satisfies BlogPostContent;
        })
    );

    // Sort by date descending (newest first)
    return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(
    slug: string
): Promise<BlogPostContent | null> {
    try {
        const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
        const { frontmatter, content } = await parseMdxFile<{
            title: string;
            summary: string;
            date: string;
            tags?: string[];
            author?: string;
            order?: number;
        }>(filePath, slug);

        return {
            id: slug,
            slug,
            title: frontmatter.title || "Untitled Post",
            summary: frontmatter.summary || "",
            tags: frontmatter.tags || [],
            date: frontmatter.date || new Date().toISOString(),
            author: frontmatter.author,
            order: frontmatter.order,
            content,
        } satisfies BlogPostContent;
    } catch (error) {
        console.error(`Error loading post ${slug}:`, error);
        return null;
    }
}

// ============================================================================
// NARRATIVE LOADERS
// ============================================================================

/**
 * Get all narrative blocks sorted by order
 */
export async function getNarrativeBlocks(): Promise<NarrativeBlock[]> {
    const files = await getMdxFiles(NARRATIVE_DIR);

    const blocks = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace(/\.mdx$/, "");
            const filePath = path.join(NARRATIVE_DIR, file);
            const { frontmatter, content } = await parseMdxFile<{
                title: string;
                order: number;
                summary?: string;
            }>(filePath, slug);

            return {
                id: slug,
                slug,
                title: frontmatter.title || "Untitled Block",
                order: frontmatter.order ?? 999,
                summary: frontmatter.summary,
                content,
            } satisfies NarrativeBlock;
        })
    );

    // Sort by order ascending
    return blocks.sort((a, b) => a.order - b.order);
}

/**
 * Get a single narrative block by slug
 */
export async function getNarrativeBlockBySlug(
    slug: string
): Promise<NarrativeBlock | null> {
    try {
        const filePath = path.join(NARRATIVE_DIR, `${slug}.mdx`);
        const { frontmatter, content } = await parseMdxFile<{
            title: string;
            order: number;
            summary?: string;
        }>(filePath, slug);

        return {
            id: slug,
            slug,
            title: frontmatter.title || "Untitled Block",
            order: frontmatter.order ?? 999,
            summary: frontmatter.summary,
            content,
        } satisfies NarrativeBlock;
    } catch (error) {
        console.error(`Error loading narrative block ${slug}:`, error);
        return null;
    }
}

// ============================================================================
// MDX COMPONENTS MAPPING
// ============================================================================

/**
 * Default MDX components mapping
 * Can be extended with custom components like Callout, TimelineItem, etc.
 */
export const mdxComponents = {
    // Headings
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="text-4xl font-bold mb-6" {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="text-3xl font-bold mb-4 mt-8" {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="text-2xl font-semibold mb-3 mt-6" {...props} />
    ),
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 className="text-xl font-semibold mb-2 mt-4" {...props} />
    ),
    h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5 className="text-lg font-semibold mb-2 mt-3" {...props} />
    ),
    h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6 className="text-base font-semibold mb-2 mt-2" {...props} />
    ),

    // Paragraphs
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="mb-4 leading-7" {...props} />
    ),

    // Lists
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
    ),
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
        <li className="ml-4" {...props} />
    ),

    // Links
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
            className="text-blue-600 dark:text-blue-400 hover:underline"
            {...props}
        />
    ),

    // Code blocks
    code: (props: React.HTMLAttributes<HTMLElement>) => (
        <code
            className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm"
            {...props}
        />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4"
            {...props}
        />
    ),

    // Blockquotes
    blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4"
            {...props}
        />
    ),

    // Horizontal rule
    hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
        <hr className="my-8 border-gray-300 dark:border-gray-700" {...props} />
    ),

    // Tables
    table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
        <div className="overflow-x-auto mb-4" >
            <table className="min-w-full divide-y divide-gray-200" {...props} />
        </div>
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
        <th
            className="px-4 py-2 bg-gray-50 dark:bg-gray-800 font-semibold text-left"
            {...props}
        />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
        <td className="px-4 py-2 border-t" {...props} />
    ),

    // Custom components (placeholders for future implementation)
    // Callout: Callout,
    // TimelineItem: TimelineItem,
};

export type MdxComponents = typeof mdxComponents;
