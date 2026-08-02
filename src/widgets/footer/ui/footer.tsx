import { Container } from "@/shared/ui/container/container"
import Link from "next/link"

interface FooterColumn {
	title: string
	links: { href: string; label: string }[]
}

const columns: FooterColumn[] = [
	{
		title: "Сайт",
		links: [
			{ href: "/", label: "Главная" },
			{ href: "/#recipes", label: "Рецепты" },
			{ href: "/about", label: "О нас" },
		],
	},
	{
		title: "Поддержка",
		links: [
			{ href: "/faq", label: "Вопросы и ответы" },
			{ href: "/contacts", label: "Контакты" },
		],
	},
	{
		title: "Правовая информация",
		links: [
			{ href: "/privacy", label: "Политика конфиденциальности" },
			{ href: "/terms", label: "Пользовательское соглашение" },
		],
	},
]

export function Footer() {
	return (
		<footer role="contentinfo" className="p-4">
			<Container className="text-background space-y-8 rounded-2xl bg-[#222] px-8 py-10 text-sm">
				<div className="grid gap-8 sm:grid-cols-3">
					{columns.map((column) => (
						<nav key={column.title} aria-label={column.title}>
							<h2 className="text-background mb-4 tracking-widest uppercase">{column.title}</h2>
							<ul className="space-y-2">
								{column.links.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											className="focus-ring-[#878787]! -mx-2 -my-1 inline-block rounded px-2 py-1 text-[#9c9c9c] transition hover:text-white focus-visible:text-white"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>

				<hr className="border-[#3d3d3d]!" role="presentation" />

				<p className="text-xs text-[#6c6c6c]">© {new Date().getFullYear()} Рецепты от Наташи</p>
			</Container>
		</footer>
	)
}
