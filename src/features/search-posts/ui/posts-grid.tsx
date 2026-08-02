"use client"

import { PostMeta } from "@/entities/post"
import { filterPosts } from "@/entities/post/model/filter-posts"
import { cn } from "@/shared/lib/cn"
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
		<ul className="grid gap-6 sm:grid-cols-2">
			{filtered.map((post, index) => {
				const isFeatured = index === 0

				return (
					<li key={post.slug} className={isFeatured ? "sm:col-span-2" : undefined}>
						<Link
							href={"/blog/" + post.slug}
							className={cn(
								"group bg-card border-border shadow-soft grid h-full rounded-[1.75rem] border p-4",
								isFeatured ? "gap-6 sm:grid-cols-2 sm:items-center" : "grid-rows-[auto_1fr]"
							)}
						>
							{post.image && (
								<div
									className={cn(
										"bg-muted relative overflow-hidden rounded-xl",
										isFeatured ? "aspect-4/3" : "mb-4 aspect-4/3"
									)}
								>
									<img
										src={withBasePath(post.image)}
										alt={post.title}
										className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
									/>
									{isFeatured && (
										<span className="bg-primary text-primary-foreground absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase shadow-sm">
											{isFiltering ? "Совпадение" : "Новый рецепт"}
										</span>
									)}
								</div>
							)}

							<div className={cn(isFeatured ? "" : "grid grid-rows-[auto_1fr_auto] px-2 pb-1")}>
								<span className="text-secondary text-xs font-medium tracking-widest uppercase">
									{formatDateRu(post.date)}
								</span>
								<H2 className={cn("mt-2 leading-snug", isFeatured ? "text-2xl sm:text-3xl" : "text-2xl!")}>
									{post.title}
								</H2>
								<span className="text-primary mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
									Читать рецепт
									<span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
										→
									</span>
								</span>
							</div>
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
