import { MDXRemote } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/lib/mdx";

interface MdxContentProps {
    content: string;
}

/**
 * Component for rendering MDX content with custom components
 */
export function MdxContent({ content }: MdxContentProps) {
    return <MDXRemote source={content} components={mdxComponents} />;
}
