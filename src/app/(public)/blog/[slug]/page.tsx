import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Shell } from "@/components/layout/Shell";
import { MdxContent } from "@/components/MdxContent";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return {};
    }

    return {
        title: post.title,
        description: post.summary,
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <Shell>
            <Link
                href="/blog"
                className="text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block"
            >
                ← Back to Blog
            </Link>
            <PageHeader
                title={post.title}
                description={post.summary}
            />
            <Section>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                    <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                    {post.author && (
                        <>
                            <span>•</span>
                            <span>{post.author}</span>
                        </>
                    )}
                    {post.tags && post.tags.length > 0 && (
                        <>
                            <span>•</span>
                            <div className="flex gap-2">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="font-medium text-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <article className="prose dark:prose-invert max-w-none">
                    <MdxContent content={post.content} />
                </article>
            </Section>
        </Shell>
    );
}
