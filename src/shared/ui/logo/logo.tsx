import { marckScript } from "@/shared/config/fonts"
import { cn } from "@/shared/lib/cn"
import { UtensilsIcon } from "@/shared/ui/icons"
import Link from "next/link"

export function Logo() {
	return (
		<Link href="/" className="group inline-flex -rotate-2 items-center gap-2 transition-transform hover:-rotate-1">
			<UtensilsIcon className="shrink-0" />

			<span className={cn(marckScript.className, "leading-none")}>
				<span className="block text-lg">рецепты от</span>
				<span className="-mt-3 block text-2xl">Наташи</span>
			</span>
		</Link>
	)
}
