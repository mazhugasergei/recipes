import { ComponentProps } from "react"

export function SearchIcon(props: ComponentProps<"svg">) {
	return (
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden {...props}>
			<circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
			<path d="M16 16l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
		</svg>
	)
}
