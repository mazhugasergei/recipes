import { ComponentProps } from "react"

export function UtensilsIcon(props: ComponentProps<"svg">) {
	return (
		<svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden {...props}>
			<path
				d="M9 3c-2.5 1.5-3 4-1.5 6.5S9 13 9 13s.5 8-1 10"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
			/>
			<ellipse cx="9" cy="6" rx="3.4" ry="4" stroke="currentColor" strokeWidth="1.6" />
			<path
				d="M17 3v9c0 1.5-1 2-2 2s-2-.5-2-2c0-1.5 1-2 2-2V3"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M15 12v11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
		</svg>
	)
}
