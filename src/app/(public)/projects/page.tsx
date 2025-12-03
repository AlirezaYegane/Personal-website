import Link from "next/link";

import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Shell } from "@/components/layout/Shell";
import { getAllProjects } from "@/lib/mdx";

export const metadata = {
    title: "Projects",
    description: "A collection of my work and side projects.",
};

export default async function ProjectsPage() {
    const projects = await getAllProjects();

    return (
        <Shell>
            <PageHeader
                title="Projects"
                description="A collection of my work, side projects, and experiments."
            />
            <Section>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Link
                            key={project.slug}
                            href={`/projects/${project.slug}`}
                            className="group relative flex flex-col space-y-3 rounded-lg border p-6 hover:bg-muted/50 transition-colors"
                        >
                            <div className="space-y-2">
                                <h3 className="font-bold text-xl group-hover:underline decoration-2 underline-offset-4">
                                    {project.title}
                                </h3>
                                {project.tags && project.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <p className="text-muted-foreground line-clamp-3">
                                    {project.summary}
                                </p>
                            </div>
                            {project.date && (
                                <div className="mt-auto pt-4 text-sm text-muted-foreground">
                                    {project.date}
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </Section>
        </Shell>
    );
}
