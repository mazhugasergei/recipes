import { Container } from "@/shared/ui/container/container"
import { Logo } from "@/shared/ui/logo/logo"
import Link from "next/link"

const navLinks = [
	{ href: "/", label: "Главная" },
	{ href: "/#recipes", label: "Рецепты" },
]

export function Header() {
	return (
		<header className="bg-background sticky top-0 z-10 border-b">
			<Container className="flex items-center justify-between py-2">
				<Logo />

				<nav aria-label="Основная навигация" className="hidden items-center gap-6 sm:flex">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-foreground/70 hover:text-primary text-sm font-medium underline-offset-4 transition-colors hover:underline"
						>
							{link.label}
						</Link>
					))}
				</nav>

				<span className="text-secondary text-xs tracking-widest uppercase sm:hidden">домашняя кухня</span>
			</Container>
		</header>
	)
}
