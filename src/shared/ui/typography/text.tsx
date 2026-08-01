import { textFont } from "@/shared/config/fonts"
import { cn } from "@/shared/lib/cn"
import { ComponentProps, ElementType } from "react"

interface TextProps extends ComponentProps<"span"> {
	as?: ElementType
}

export function Text({ as: Tag = "div", className, ...props }: TextProps) {
	return (
		<Tag
			className={cn(textFont.className, "text-foreground/90 text-lg leading-[1.75] tracking-[0.01em]", className)}
			{...props}
		/>
	)
}
