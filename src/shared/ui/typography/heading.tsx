import { cn } from "@/shared/lib/cn"
import { ComponentProps } from "react"

const base = "font-[family-name:var(--font-heading)] text-foreground"

export function H1({ className, ...props }: ComponentProps<"h1">) {
	return <h1 className={cn(base, "text-4xl font-semibold tracking-tight", className)} {...props} />
}

export function H2({ className, ...props }: ComponentProps<"h2">) {
	return <h2 className={cn(base, "text-3xl font-semibold tracking-tight", className)} {...props} />
}

export function H3({ className, ...props }: ComponentProps<"h3">) {
	return <h3 className={cn(base, "text-2xl font-semibold", className)} {...props} />
}

export function H4({ className, ...props }: ComponentProps<"h4">) {
	return <h4 className={cn(base, "text-xl font-semibold", className)} {...props} />
}

export function H5({ className, ...props }: ComponentProps<"h5">) {
	return <h5 className={cn(base, "text-lg font-semibold", className)} {...props} />
}

export function H6({ className, ...props }: ComponentProps<"h6">) {
	return <h6 className={cn(base, "text-base font-semibold", className)} {...props} />
}
