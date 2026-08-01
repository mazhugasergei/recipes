"use client"

import { PostMeta } from "@/entities/post"
import { formatDateRu } from "@/shared/lib/format-date"
import { SearchIcon } from "@/shared/ui/icons/search-icon"
import { H2 } from "@/shared/ui/typography"
import Link from "next/link"
import { useMemo, useState } from "react"

function withBasePath(src: string) {
	return `${process.env["NEXT_PUBLIC_BASE_PATH"] ?? ""}${src}`
}

export function PostsSearch({ posts }: { posts: PostMeta[] }) {
	const [query, setQuery] = useState("")

	const filtered = useMemo(() => {
		const q = query.trim().toLocaleLowerCase("ru")
		if (!q) return posts
		return posts.filter((post) => post.title.toLocaleLowerCase("ru").includes(q))
	}, [posts, query])

	const isSearching = query.trim().length > 0
	const [featured, ...rest] = filtered

	return (
		<>
			<div className="relative mb-12">
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
				<div className="space-y-12">
					{/* first result gets a larger, editorial treatment — a small hierarchy cue instead of a uniform wall of identical cards */}
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
										{isSearching ? "Совпадение" : "Новый рецепт"}
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
			)}
		</>
	)
}
