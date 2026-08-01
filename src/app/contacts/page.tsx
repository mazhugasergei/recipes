import { Container } from "@/shared/ui/container/container"
import { H1, H2 } from "@/shared/ui/typography"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Контакты — Рецепты от Наташи",
	description: "Контакты сайта «Рецепты от Наташи».",
}

interface Contact {
	name: string
	role: string
	whatsapp: { href: string; label: string }
	telegram: { href: string; label: string }
	max: { href: string; label: string }
	email: { href: string; label: string }
}

const contacts: Contact[] = [
	{
		name: "Наталья Ознобихина",
		role: "Автор рецептов, блогер",
		whatsapp: { href: "https://wa.me/+821047989320", label: "+82 10 4798 9320" },
		telegram: { href: "https://t.me/+821047989320", label: "+82 10 4798 9320" },
		max: {
			href: "https://max.ru/u/f9LHodD0cOK59gb3PhzvndCqEW3uA40gYFXtzOwg7LV3WesiYLuEMUa0vTU",
			label: "Наталья Ознобихина",
		},
		email: { href: "mailto:oznobikhina_natal@mail.ru", label: "oznobikhina_natal@mail.ru" },
	},
	{
		name: "Сергей Мажуга",
		role: "Разработчик и техническая поддержка сайта",
		whatsapp: { href: "https://wa.me/+79243281930", label: "+7 924 328 19 30" },
		telegram: { href: "https://t.me/+79243281930", label: "+7 924 328 19 30" },
		max: {
			href: "https://max.ru/u/f9LHodD0cOLywn6PF-CM4RJ6fNGsGFHrRonwwqAbYmvyslB6hTEbZMs7Zho",
			label: "Сергей Мажуга",
		},
		email: { href: "mailto:mazhugasergei8@gmail.com", label: "mazhugasergei8@gmail.com" },
	},
]

const contactFields: { key: keyof Omit<Contact, "name" | "role">; label: string }[] = [
	{ key: "whatsapp", label: "WhatsApp" },
	{ key: "telegram", label: "Telegram" },
	{ key: "max", label: "MAX" },
	{ key: "email", label: "Email" },
]

export default function ContactsPage() {
	return (
		<Container className="py-16">
			<H1 className="mb-10">Контакты</H1>

			<div className="max-w-2xl space-y-8">
				{contacts.map((contact) => (
					<div key={contact.name} className="bg-card rounded-2xl border p-6">
						<H2 className="text-lg">{contact.name}</H2>
						<p className="text-secondary mt-2 mb-5 text-sm tracking-wide">{contact.role}</p>

						<dl className="space-y-4 sm:space-y-3">
							{contactFields.map(({ key, label }) => {
								const { href, label: value } = contact[key]
								return (
									<div key={key} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
										<dt className="text-secondary text-xs tracking-widest uppercase sm:w-24 sm:shrink-0">{label}</dt>
										<dd>
											<a
												href={href}
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground/80 hover:text-primary -mx-2 -my-1 rounded px-2 py-1 underline-offset-4 transition hover:underline"
											>
												{value}
											</a>
										</dd>
									</div>
								)
							})}
						</dl>
					</div>
				))}
			</div>
		</Container>
	)
}
