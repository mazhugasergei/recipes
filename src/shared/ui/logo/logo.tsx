import { UtensilsIcon } from "@/shared/ui/icons"
import { Marck_Script } from "next/font/google"
import Link from "next/link"

const marckScript = Marck_Script({ subsets: ["latin", "cyrillic"], weight: "400" })

export function Logo() {
	return (
		<Link href="/" className="group inline-flex -rotate-1 items-center gap-2 transition-transform hover:rotate-0">
			<UtensilsIcon className="text-primary shrink-0" />

			<span className={`${marckScript.className} text-primary leading-none`}>
				<span className="block text-lg">рецепты от</span>
				<span className="-mt-1 block text-2xl">наташи</span>
			</span>
		</Link>
	)
}
