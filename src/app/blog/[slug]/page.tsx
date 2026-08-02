import { getAllPostsMeta, getPostBySlug } from "@/entities/post"
import { cn } from "@/shared/lib/cn"
import { formatDateRu } from "@/shared/lib/format-date"
import { H1, H2, Text } from "@/shared/ui/typography"
import { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"

const mdxComponents = {
	h2: ({ className, ...props }: React.ComponentProps<"h2">) => (
		<H2 className={cn("mt-10 mb-4 text-2xl", className)} {...props} />
	),
	p: ({ className, ...props }: React.ComponentProps<"p">) => (
		<Text as="p" className={cn("mb-4", className)} {...props} />
	),
	a: ({ className, ...props }: React.ComponentProps<"a">) => (
		<a className={cn("text-primary underline underline-offset-4", className)} {...props} />
	),
	ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
		<ul className={cn("mb-5 space-y-2", className)} {...props} />
	),
	li: ({ className, ...props }: React.ComponentProps<"li">) => (
		<li className={cn("relative pl-5 [&::marker]:content-none", className)} {...props}>
			<span className="bg-primary absolute top-2.5 left-0 h-1.5 w-1.5 rounded-full" aria-hidden />
			<Text>{props.children}</Text>
		</li>
	),
	img: ({ src, className, ...props }: React.ComponentProps<"img">) => (
		<img
			className={cn("my-8 rounded-2xl shadow-lg", className)}
			src={`${process.env["NEXT_PUBLIC_BASE_PATH"] ?? ""}${src}`}
			{...props}
		/>
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
		title: `${post.title}`,
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
			<div className="text-secondary border-primary/40 mt-4 mb-6 inline-block border-b-2 border-dashed pb-2 text-xs tracking-widest uppercase">
				{formatDateRu(post.date)}
			</div>

			<MDXRemote source={post.content} components={mdxComponents} />
		</main>
	)
}
