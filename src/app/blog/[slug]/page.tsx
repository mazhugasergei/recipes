import { getAllPostsMeta, getPostBySlug } from "@/entities/post"
import { formatDateRu } from "@/shared/lib/format-date"
import { H1, H2, Text } from "@/shared/ui/typography"
import { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"

const mdxComponents = {
	h2: (props: React.ComponentProps<"h2">) => <H2 className="mt-10 mb-4 text-2xl" {...props} />,
	p: (props: React.ComponentProps<"p">) => <Text as="p" {...props} />,
	a: (props: React.ComponentProps<"a">) => <a className="text-primary underline underline-offset-4" {...props} />,
	ul: (props: React.ComponentProps<"ul">) => <ul className="mb-5 space-y-2" {...props} />,
	li: (props: React.ComponentProps<"li">) => (
		<li className="relative pl-5 [&::marker]:content-none" {...props}>
			<span className="bg-primary absolute top-2.5 left-0 h-1.5 w-1.5 rounded-full" aria-hidden />
			<Text>{props.children}</Text>
		</li>
	),
	img: (props: React.ComponentProps<"img">) => (
		<img
			className="my-8 rounded-2xl shadow-lg"
			src={`${process.env["NEXT_PUBLIC_BASE_PATH"] ?? ""}${props.src}`}
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
			<div className="text-secondary border-primary/40 mt-4 mb-6 inline-block border-b-2 border-dashed pb-2 text-xs tracking-widest uppercase">
				{formatDateRu(post.date)}
			</div>

			{post.image && (
				<img
					src={`${process.env["NEXT_PUBLIC_BASE_PATH"] ?? ""}${post.image}`}
					alt={post.title}
					className="mb-10 h-72 w-full rounded-2xl object-cover shadow-lg sm:h-96"
				/>
			)}

			<MDXRemote source={post.content} components={mdxComponents} />
		</main>
	)
}
