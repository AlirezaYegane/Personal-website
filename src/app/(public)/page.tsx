import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { getAllProjects } from "@/lib/mdx";

export default async function HomePage() {
    const projects = await getAllProjects();
    const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Hero Section */}
            <section className="flex flex-col items-start justify-center pt-16 md:pt-24">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl dark:text-gray-100">
                    AI Research, <br className="hidden md:block" />
                    Anomaly Detection & Automation
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                    I&apos;m a software engineer and researcher focused on building intelligent systems.
                    Currently exploring the intersection of healthcare data and machine learning.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                        href="/narrative"
                        className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
                    >
                        Read the Story
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                        href="/projects"
                        className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
                    >
                        Explore Projects
                    </Link>
                </div>
            </section>

            {/* Now Section */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Now</h2>
                <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50">
                    <p className="text-gray-600 dark:text-gray-400">
                        Currently focused on <strong>AVITEC</strong>, working on advanced anomaly detection algorithms for Electronic Health Records (EHR).
                        Also diving deep into agentic workflows and LLM applications.
                    </p>
                </div>
            </section>

            {/* Featured Projects */}
            <section>
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Featured Projects</h2>
                    <Link
                        href="/projects"
                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                        View all projects
                    </Link>
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {featuredProjects.length > 0 ? (
                        featuredProjects.map((project) => (
                            <Link
                                key={project.slug}
                                href={`/projects/${project.slug}`}
                                className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
                            >
                                <div className="flex flex-1 flex-col p-6">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                                        {project.title}
                                    </h3>
                                    <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                                        {project.summary}
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
                            <p>No featured projects found. Add some MDX files to src/content/projects!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
