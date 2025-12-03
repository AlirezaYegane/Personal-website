import Link from "next/link";
import { notFound } from "next/navigation";

import { MdxContent } from "@/components/MdxContent";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Shell } from "@/components/layout/Shell";
import { getAllProjects, getProjectBySlug } from "@/lib/mdx";

interface ProjectPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const projects = await getAllProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
    const project = await getProjectBySlug(params.slug);

    if (!project) {
        return {};
    }

    return {
        title: project.title,
        description: project.summary,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const project = await getProjectBySlug(params.slug);

    if (!project) {
        notFound();
    }

    return (
        <Shell>
            <Link
                href="/projects"
                className="text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block"
            >
                ← Back to Projects
            </Link>
            <PageHeader
                title={project.title}
                description={project.summary}
            />
            <Section>
                <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags && project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold text-foreground"
                        >
                            {tag}
                        </span>
                    ))}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                        >
                            GitHub
                        </a>
                    )}
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                        >
                            Live Demo
                        </a>
                    )}
                </div>
                <article className="prose dark:prose-invert max-w-none">
                    <MdxContent content={project.content} />
                </article>
            </Section>
        </Shell>
    );
}
