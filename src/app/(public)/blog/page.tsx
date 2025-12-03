import Link from "next/link";

import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Shell } from "@/components/layout/Shell";
import { getAllPosts } from "@/lib/mdx";

export const metadata = {
    title: "Blog",
    description: "Thoughts, tutorials, and insights.",
};

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <Shell>
            <PageHeader
                title="Blog"
                description="Thoughts, tutorials, and insights on software development and design."
            />
            <Section>
                <div className="grid gap-8">
                    {posts.map((post) => (
                        <article key={post.slug} className="group relative flex flex-col space-y-2">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </time>
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
                            <Link href={`/blog/${post.slug}`}>
                                <h2 className="text-2xl font-bold group-hover:underline decoration-2 underline-offset-4">
                                    {post.title}
                                </h2>
                            </Link>
                            <p className="text-muted-foreground max-w-3xl">
                                {post.summary}
                            </p>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="text-sm font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                            >
                                Read more
                                <span aria-hidden="true">→</span>
                            </Link>
                        </article>
                    ))}
                </div>
            </Section>
        </Shell>
    );
}
