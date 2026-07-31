import { lora } from "@/shared/config/fonts"
import { cn } from "@/shared/lib/cn"
import { formatDateRu } from "@/shared/lib/format-date"
import { preventOrphan } from "@/shared/lib/prevent-orphan"
import { H1, H2 } from "@/shared/ui/typography"
import fs from "fs"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote/rsc"
import path from "path"

const POSTS_DIR = path.join(process.cwd(), "content/posts")

interface PostFrontmatter {
	title: string
	date: string
	image?: string
}

const mdxComponents = {
	h2: (props: React.ComponentProps<"h2">) => <H2 className="mt-10 mb-4 text-2xl" {...props} />,
	li: (props: React.ComponentProps<"li">) => (
		<li className="text-foreground/90 relative pl-5 [&::marker]:content-none" {...props}>
			<span className="bg-primary absolute top-2.5 left-0 h-1.5 w-1.5 rounded-full" aria-hidden />
			{props.children}
		</li>
	),
}

export function generateStaticParams() {
	const files = fs.readdirSync(POSTS_DIR)
	return files.map((filename) => ({ slug: filename.replace(/\.mdx$/, "") }))
}

export const dynamicParams = false

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf-8")
	const { content, data } = matter(raw)
	const frontmatter = data as PostFrontmatter

	return (
		<>
			<H1 className="mb-3">{preventOrphan(frontmatter.title)}</H1>
			<div className="text-secondary border-primary/40 mb-6 inline-block border-b-2 border-dashed pb-2 text-xs tracking-widest uppercase">
				{formatDateRu(frontmatter.date)}
			</div>

			{frontmatter.image && (
				<img
					src={frontmatter.image}
					alt={frontmatter.title}
					className="mb-10 h-72 w-full rounded-2xl object-cover shadow-lg sm:h-96"
				/>
			)}

			<div
				className={cn(
					lora.className,
					"[&_p]:text-foreground/90 [&_a]:text-primary text-[17px] [&_a]:underline [&_a]:underline-offset-4 [&_img]:my-8 [&_img]:rounded-2xl [&_img]:shadow-lg [&_p]:mb-5 [&_p]:leading-relaxed [&_ul]:mb-5 [&_ul]:space-y-2"
				)}
			>
				<MDXRemote source={content} components={mdxComponents} />
			</div>
		</>
	)
}
