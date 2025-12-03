import { getNarrativeBlocks } from "@/lib/mdx";
import { MdxContent } from "@/components/MdxContent";
import { NarrativeSection } from "@/components/narrative/NarrativeSection";
import { Timeline } from "@/components/narrative/Timeline";


export const metadata = {
    title: "Narrative | My Story",
    description: "The timeline of my journey in AI and software engineering.",
};

export default async function NarrativePage() {
    const narrativeBlocks = await getNarrativeBlocks();

    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center mb-16">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-gray-100">
                    The Story
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    A chronological look at my path through computer science, research, and engineering.
                </p>
            </div>

            <Timeline>
                {narrativeBlocks.length > 0 ? (
                    narrativeBlocks.map((block, index) => (
                        <NarrativeSection
                            key={block.slug}
                            title={block.title}
                            subtitle={block.summary}
                            // Assuming the year might be in the title or summary for now, 
                            // or we could add a year field to the frontmatter later.
                            // For now, let's try to extract it or just leave it optional.
                            // If we want to be strict, we should update the type definition.
                            // For this implementation, I'll assume the user will add a 'year' or 'date' field to frontmatter if needed,
                            // but the current type definition doesn't strictly enforce it for NarrativeBlock.
                            // Let's check types.ts again. NarrativeBlock has id, slug, title, order, summary, content.
                            // I'll add a TODO to add 'year' to frontmatter if desired.
                            year={index === 0 ? "Start" : undefined}
                            delay={index * 0.1}
                        >
                            <MdxContent content={block.content} />
                        </NarrativeSection>
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <p>No narrative blocks found. Add some MDX files to src/content/narrative!</p>
                    </div>
                )}
            </Timeline>
        </div>
    );
}
