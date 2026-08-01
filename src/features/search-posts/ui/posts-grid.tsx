"use client"

import { PostMeta } from "@/entities/post"
import { filterPosts } from "@/entities/post/model/filter-posts"
import { formatDateRu } from "@/shared/lib/format-date"
import { useQueryParam } from "@/shared/lib/use-query-param"
import { H2 } from "@/shared/ui/typography"
import Link from "next/link"

function withBasePath(src: string) {
	return `${process.env["NEXT_PUBLIC_BASE_PATH"] ?? ""}${src}`
}

export function PostsGrid({ posts }: { posts: PostMeta[] }) {
	const [query] = useQueryParam("q")
	const [activeTag] = useQueryParam("tag")

	const filtered = filterPosts(posts, query, activeTag)
	const isFiltering = query.length > 0 || activeTag.length > 0
	const [featured, ...rest] = filtered

	if (filtered.length === 0) {
		return (
			<p className="text-secondary text-sm">
				{query
					? `Ничего не нашлось по запросу «${query}». Попробуйте другое слово.`
					: "По этому тегу пока нет рецептов."}
			</p>
		)
	}

	return (
		<div className="space-y-12">
			{featured && (
				<Link
					href={"/blog/" + featured.slug}
					className="group bg-card border-border shadow-soft grid gap-6 rounded-3xl border p-6 sm:grid-cols-2 sm:items-center"
				>
					{featured.image && (
						<div className="bg-muted relative aspect-4/3 overflow-hidden rounded-2xl">
							<img
								src={withBasePath(featured.image)}
								alt={featured.title}
								className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
							/>
							<span className="bg-primary text-primary-foreground absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase shadow-sm">
								{isFiltering ? "Совпадение" : "Новый рецепт"}
							</span>
						</div>
					)}
					<div>
						<span className="text-secondary text-xs font-medium tracking-widest uppercase">
							{formatDateRu(featured.date)}
						</span>
						<H2 className="mt-3 text-2xl leading-snug sm:text-3xl">{featured.title}</H2>
						<span className="text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
							Читать рецепт
							<span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
								→
							</span>
						</span>
					</div>
				</Link>
			)}

			{rest.length > 0 && (
				<ul className="grid gap-6 sm:grid-cols-2">
					{rest.map((post) => (
						<li key={post.slug}>
							<Link
								href={"/blog/" + post.slug}
								className="group bg-card border-border shadow-soft grid h-full grid-rows-[auto_1fr] rounded-[1.75rem] border p-4"
							>
								{post.image && (
									<div className="bg-muted mb-4 aspect-4/3 overflow-hidden rounded-xl">
										<img
											src={withBasePath(post.image)}
											alt={post.title}
											className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
										/>
									</div>
								)}
								<div className="grid grid-rows-[auto_1fr_auto] px-2 pb-1">
									<span className="text-secondary text-xs font-medium tracking-widest uppercase">
										{formatDateRu(post.date)}
									</span>
									<H2 className="mt-2 text-2xl! leading-snug">{post.title}</H2>
									<span className="text-primary mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
										Читать рецепт
										<span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
											→
										</span>
									</span>
								</div>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
