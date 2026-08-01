import { getAllPostsMeta, getPostBySlug } from "@/entities/post"
import { lora } from "@/shared/config/fonts"
import { cn } from "@/shared/lib/cn"
import { formatDateRu } from "@/shared/lib/format-date"
import { H1, H2 } from "@/shared/ui/typography"
import { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"

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
	return getAllPostsMeta().map((post) => ({ slug: post.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params
	const post = getPostBySlug(slug)
	if (!post) return {}

	const description = post.content
		.replace(/[#*_>\-\[\]!]/g, "")
		.replace(/\s+/g, " ")
		.trim()
		.slice(0, 160)

	return {
		title: `${post.title} — Рецепты от Наташи`,
		description,
		openGraph: {
			title: post.title,
			description,
			images: post.image ? [post.image] : undefined,
		},
	}
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const post = getPostBySlug(slug)
	if (!post) notFound()

	return (
		<main>
			<H1>{post.title}</H1>
			<div className="text-secondary border-primary/40 mb-6 inline-block border-b-2 border-dashed pb-2 text-xs tracking-widest uppercase">
				{formatDateRu(post.date)}
			</div>

			{post.image && (
				<img
					src={post.image}
					alt={post.title}
					className="mb-10 h-72 w-full rounded-2xl object-cover shadow-lg sm:h-96"
				/>
			)}

			<div
				className={cn(
					lora.className,
					"[&_a]:text-primary space-y-5 text-[17px] [&_a]:underline [&_a]:underline-offset-4 [&_img]:my-8 [&_img]:rounded-2xl [&_img]:shadow-lg [&_p]:leading-relaxed [&_ul]:mb-5 [&_ul]:space-y-2"
				)}
			>
				<MDXRemote source={post.content} components={mdxComponents} />
			</div>
		</main>
	)
}
