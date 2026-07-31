import { cn } from "@/shared/lib/cn"
import { ComponentProps } from "react"

export function Container({ className, ...props }: ComponentProps<"div">) {
	return <div className={cn("mx-auto max-w-3xl px-6", className)} {...props} />
}
