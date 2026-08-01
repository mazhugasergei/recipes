"use client"

import { useQueryParam } from "@/shared/lib/use-query-param"
import { Button } from "@/shared/ui/button/button"
import { SearchIcon } from "@/shared/ui/icons/search-icon"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

export function SearchInput() {
	const [query, setQuery] = useQueryParam("q")
	const [localValue, setLocalValue] = useState(query)

	// keeps the input in sync if the url changes from elsewhere (e.g. browser back/forward)
	useEffect(() => {
		setLocalValue(query)
	}, [query])

	// debounces the actual url write so typing feels instant while the url still settles shortly after
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (localValue !== query) setQuery(localValue)
		}, 300)
		return () => clearTimeout(timeout)
	}, [localValue, query, setQuery])

	return (
		<div className="relative mb-6">
			<SearchIcon className="text-secondary pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
			<input
				type="text"
				value={localValue}
				onChange={(e) => setLocalValue(e.target.value)}
				placeholder="Найти рецепт…"
				className="bg-card text-foreground placeholder:text-secondary/70 shadow-soft w-full rounded-xl border py-3 pr-11 pl-11 text-sm"
			/>
			{localValue && (
				<Button
					variant="ghost"
					size="icon-sm"
					onClick={() => setLocalValue("")}
					aria-label="Очистить поиск"
					className="absolute top-1/2 right-2 -translate-y-1/2"
				>
					<X />
				</Button>
			)}
		</div>
	)
}
