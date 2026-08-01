import { Container } from "@/shared/ui/container/container"
import Link from "next/link"

export function Footer() {
	return (
		<footer role="contentinfo" className="p-4">
			<Container className="text-background space-y-4 rounded-2xl bg-[#222] py-6 text-sm">
				<p className="text-[#cacaca]">Рецепты от Наташи — домашняя кухня</p>
				<hr className="border-[#575757]!" role="presentation" />
				<nav
					aria-label="Правовая информация"
					className="[&_a]:focus-ring-[#878787]! flex justify-end gap-2 text-[#676767] [&_a]:-m-2 [&_a]:rounded [&_a]:p-2 [&_a]:transition [&_a]:hover:text-[#878787] [&_a]:focus-visible:text-[#878787]"
				>
					<Link href="/privacy">Политика конфиденциальности</Link>
					<span aria-hidden="true">|</span>
					<Link href="/terms">Пользовательское соглашение</Link>
				</nav>
			</Container>
		</footer>
	)
}
