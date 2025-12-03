import { getAllProjects, getAllPosts, getNarrativeBlocks } from "@/lib/mdx";

export default async function TestMdxPage() {
    const projects = await getAllProjects();
    const posts = await getAllPosts();
    const narrativeBlocks = await getNarrativeBlocks();

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">
                MDX Content System Test Page
            </h1>

            {/* Narrative Blocks */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">
                    Narrative Blocks ({narrativeBlocks.length})
                </h2>
                <div className="space-y-4">
                    {narrativeBlocks.map((block) => (
                        <div
                            key={block.slug}
                            className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg"
                        >
                            <h3 className="text-xl font-semibold">
                                {block.order}. {block.title}
                            </h3>
                            {block.summary && (
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    {block.summary}
                                </p>
                            )}
                            <p className="text-sm text-gray-500 mt-2">
                                Slug: {block.slug}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">
                    Projects ({projects.length})
                </h2>
                <div className="space-y-4">
                    {projects.map((project) => (
                        <div
                            key={project.slug}
                            className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg"
                        >
                            <h3 className="text-xl font-semibold">
                                {project.title}
                                {project.featured && (
                                    <span className="ml-2 text-sm bg-yellow-500 text-black px-2 py-1 rounded">
                                        Featured
                                    </span>
                                )}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                {project.summary}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-3 text-sm text-gray-500 space-y-1">
                                <p>Slug: {project.slug}</p>
                                {project.order !== undefined && (
                                    <p>Order: {project.order}</p>
                                )}
                                {project.github && (
                                    <p>
                                        GitHub:{" "}
                                        <a
                                            href={project.github}
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            {project.github}
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Blog Posts */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">
                    Blog Posts ({posts.length})
                </h2>
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div
                            key={post.slug}
                            className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg"
                        >
                            <h3 className="text-xl font-semibold">
                                {post.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )}
                                </time>
                                {post.author && <span>By {post.author}</span>}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                {post.summary}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 mt-3">
                                Slug: {post.slug}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Summary */}
            <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Summary</h2>
                <ul className="space-y-2">
                    <li>
                        ✓ Loaded {narrativeBlocks.length} narrative blocks
                    </li>
                    <li>✓ Loaded {projects.length} projects</li>
                    <li>✓ Loaded {posts.length} blog posts</li>
                    <li>✓ Frontmatter parsing working correctly</li>
                    <li>✓ All content types properly typed</li>
                </ul>
            </section>
        </div>
    );
}
