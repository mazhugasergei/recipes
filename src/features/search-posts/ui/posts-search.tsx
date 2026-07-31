"use client"

import { PostMeta } from "@/entities/post"
import { SearchIcon } from "@/shared/ui/icons/search-icon"
import { H2 } from "@/shared/ui/typography"
import Link from "next/link"
import { useMemo, useState } from "react"

export function PostsSearch({ posts }: { posts: PostMeta[] }) {
	const [query, setQuery] = useState("")

	const filtered = useMemo(() => {
		const q = query.trim().toLocaleLowerCase("ru")
		if (!q) return posts
		return posts.filter((post) => post.title.toLocaleLowerCase("ru").includes(q))
	}, [posts, query])

	return (
		<>
			<div className="relative mb-10">
				<div className="relative mb-10">
					<SearchIcon className="text-secondary pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Найти рецепт…"
						className="bg-card text-foreground placeholder:text-secondary/70 focus-visible:ring-ring/50 w-full rounded-xl border py-3 pr-4 pl-11 text-sm shadow-sm outline-none focus-visible:ring-[3px]"
					/>
				</div>
			</div>

			{filtered.length === 0 ? (
				<p className="text-secondary text-sm">Ничего не нашлось по запросу «{query}». Попробуйте другое слово.</p>
			) : (
				<ul className="grid gap-6 sm:grid-cols-2">
					{filtered.map((post) => (
						<li key={post.slug} className="card-perforation relative">
							<Link
								href={`/blog/${post.slug}`}
								className="group bg-card focus-visible:ring-ring/50 block h-full overflow-hidden rounded-xl border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-[3px] focus-visible:outline-none"
							>
								{post.image && <img src={post.image} alt={post.title} className="h-40 w-full object-cover" />}
								<div className="relative p-6 pt-8">
									<span className="bg-primary absolute -top-2 left-6 h-3 w-3 rounded-full shadow-sm" aria-hidden />
									<span className="text-secondary text-xs tracking-widest uppercase">{post.date}</span>
									<H2 className="mt-2 mb-4 text-xl">post.title</H2>
									<span className="text-primary inline-flex items-center gap-1.5 text-sm font-medium">
										Читать рецепт
										<span className="transition-transform group-hover:translate-x-1" aria-hidden>
											→
										</span>
									</span>
								</div>
							</Link>
						</li>
					))}
				</ul>
			)}
		</>
	)
}
