import { headingFont } from "@/shared/config/fonts"
import { cn } from "@/shared/lib/cn"
import { ComponentProps } from "react"

export function H1({ className, ...props }: ComponentProps<"h1">) {
	return (
		<h1
			className={cn(headingFont.className, "text-3xl font-semibold tracking-tight text-pretty sm:text-4xl", className)}
			{...props}
		/>
	)
}

export function H2({ className, ...props }: ComponentProps<"h2">) {
	return (
		<h2
			className={cn(headingFont.className, "text-2xl font-semibold tracking-tight text-pretty sm:text-3xl", className)}
			{...props}
		/>
	)
}

export function H3({ className, ...props }: ComponentProps<"h3">) {
	return (
		<h3 className={cn(headingFont.className, "text-xl font-semibold text-pretty sm:text-2xl", className)} {...props} />
	)
}

export function H4({ className, ...props }: ComponentProps<"h4">) {
	return (
		<h4 className={cn(headingFont.className, "text-lg font-semibold text-pretty sm:text-xl", className)} {...props} />
	)
}

export function H5({ className, ...props }: ComponentProps<"h5">) {
	return (
		<h5 className={cn(headingFont.className, "text-md font-semibold text-pretty sm:text-lg", className)} {...props} />
	)
}

export function H6({ className, ...props }: ComponentProps<"h6">) {
	return (
		<h6 className={cn(headingFont.className, "text-sm font-semibold text-pretty sm:text-base", className)} {...props} />
	)
}
