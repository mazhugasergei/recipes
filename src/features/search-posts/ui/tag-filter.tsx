"use client"

import { cn } from "@/shared/lib/cn"
import { useQueryParam } from "@/shared/lib/use-query-param"

export function TagFilter({ tags }: { tags: string[] }) {
	const [activeTag, setActiveTag] = useQueryParam("tag")

	if (tags.length === 0) return null

	return (
		<div className="mb-12 flex flex-wrap gap-2">
			<button
				type="button"
				onClick={() => setActiveTag("")}
				className={cn(
					"rounded-full px-3 py-1.5 text-xs font-medium tracking-wide uppercase transition",
					activeTag === ""
						? "bg-primary text-primary-foreground"
						: "bg-card border-border text-secondary hover:text-foreground border"
				)}
			>
				Все
			</button>
			{tags.map((tag) => (
				<button
					key={tag}
					type="button"
					onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
					className={cn(
						"rounded-full px-3 py-1.5 text-xs font-medium tracking-wide uppercase transition",
						activeTag === tag
							? "bg-primary text-primary-foreground"
							: "bg-card border-border text-secondary hover:text-foreground border"
					)}
				>
					{tag}
				</button>
			))}
		</div>
	)
}
