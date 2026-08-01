"use client"

import { PostMeta } from "@/entities/post"
import { formatDateRu } from "@/shared/lib/format-date"
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
				<SearchIcon className="text-secondary pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Найти рецепт…"
					className="bg-card text-foreground placeholder:text-secondary/70 shadow-soft w-full rounded-xl border py-3 pr-4 pl-11 text-sm"
				/>
			</div>

			{filtered.length === 0 ? (
				<p className="text-secondary text-sm">Ничего не нашлось по запросу «{query}». Попробуйте другое слово.</p>
			) : (
				<ul className="grid gap-6 sm:grid-cols-2">
					{filtered.map((post) => (
						<li key={post.slug} className="relative">
							<Link
								href={"/blog/" + post.slug}
								className="group bg-card border-border/60 shadow-soft hover:shadow-soft-hover block h-full overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-0.5"
							>
								{post.image && (
									<div className="overflow-hidden">
										<img
											src={`${process.env["NEXT_PUBLIC_BASE_PATH"] ?? ""}${post.image}`}
											alt={post.title}
											className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
										/>
									</div>
								)}

								<div className="p-6">
									<span className="text-secondary bg-secondary/10 inline-flex rounded-full px-2.5 py-1 text-[.7rem] font-medium tracking-wide uppercase">
										{formatDateRu(post.date)}
									</span>

									<H2 className="mt-4 text-xl leading-tight sm:text-2xl">{post.title}</H2>

									<span className="text-primary mt-5 inline-flex items-center gap-2 text-sm font-medium">
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
		</>
	)
}
