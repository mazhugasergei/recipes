"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

// reads/writes a single query param, keeping the rest of the url's existing params intact
export function useQueryParam(key: string) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const value = searchParams.get(key) ?? ""

	const setValue = useCallback(
		(next: string) => {
			const params = new URLSearchParams(searchParams.toString())
			if (next) params.set(key, next)
			else params.delete(key)
			router.replace(`${pathname}?${params.toString()}`, { scroll: false })
		},
		[key, pathname, router, searchParams]
	)

	return [value, setValue] as const
}
