export const metadata = {
    title: "About | Who I Am",
    description: "More about my background, values, and what drives me.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-gray-100 mb-8">
                    About Me
                </h1>

                <div className="space-y-16">
                    {/* Who I Am */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Who I Am
                        </h2>
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p>
                                I am a passionate software engineer and researcher with a deep interest in the potential of Artificial Intelligence to solve real-world problems.
                                My journey began with a curiosity about how things work, leading me to dive deep into computer science and eventually specialize in machine learning and anomaly detection.
                            </p>
                            <p>
                                I believe in the power of code to build tools that empower people and automate the mundane, allowing us to focus on what truly matters.
                            </p>
                        </div>
                    </section>

                    {/* What I Work On */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            What I Work On
                        </h2>
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p>
                                Currently, my primary focus is on <strong>AVITEC</strong>, where I am developing advanced algorithms for detecting anomalies in Electronic Health Records (EHR).
                                This work sits at the intersection of healthcare and AI, aiming to improve patient outcomes through early detection of irregularities.
                            </p>
                            <p>
                                Beyond that, I am constantly exploring new technologies, particularly in the realm of <strong>Agentic AI</strong> and large language models, looking for ways to create more autonomous and intelligent systems.
                            </p>
                        </div>
                    </section>

                    {/* Values & Principles */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Values & Principles
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                            <li><strong>Curiosity First:</strong> Always asking "why" and "how".</li>
                            <li><strong>Simplicity:</strong> Building systems that are easy to understand and maintain.</li>
                            <li><strong>Impact:</strong> Focusing on work that makes a tangible difference.</li>
                            <li><strong>Continuous Learning:</strong> The field is always changing, and so must we.</li>
                        </ul>
                    </section>

                    {/* Outside of Work (Optional) */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Outside of Work
                        </h2>
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p>
                                When I'm not coding or reading papers, you can find me [Insert Hobbies Here, e.g., hiking, playing chess, or exploring new coffee shops].
                                I believe that a balanced life fuels creativity and prevents burnout.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
