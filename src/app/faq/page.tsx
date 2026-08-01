import { lora } from "@/shared/config/fonts"
import { cn } from "@/shared/lib/cn"
import { Container } from "@/shared/ui/container/container"
import { H1, H2 } from "@/shared/ui/typography"
import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
	title: "Вопросы и ответы — Рецепты от Наташи",
	description: "Часто задаваемые вопросы о сайте «Рецепты от Наташи».",
}

interface FaqItem {
	question: string
	answer: ReactNode
}

const faqItems: FaqItem[] = [
	{
		question: "Можно ли использовать ваши рецепты на своём сайте или в коммерческих целях?",
		answer: (
			<p>
				Нет, рецепты и материалы сайта предназначены только для личного, некоммерческого использования. Подробнее — в{" "}
				<a href="/terms" className="text-primary underline">
					пользовательском соглашении
				</a>
				.
			</p>
		),
	},
	{
		question: "Собирает ли сайт какие-то данные обо мне?",
		answer: (
			<p>
				На данный момент сайт не использует формы, аналитику или файлы cookie. Подробности — в{" "}
				<a href="/privacy" className="text-primary underline">
					политике конфиденциальности
				</a>
				.
			</p>
		),
	},
	{
		question: "Можно ли предложить свой рецепт?",
		answer: <p>Да, напишите нам через страницу контактов — с радостью рассмотрим ваше предложение.</p>,
	},
	// TODO
	// {
	// 	question: "Планируется ли мобильное приложение?",
	// 	answer: <p>Пока нет, но сайт полностью адаптирован для просмотра с телефона.</p>,
	// },
]

export default function FaqPage() {
	return (
		<Container className="py-16 text-pretty">
			<H1 className="mb-10">Вопросы и ответы</H1>
			<div className={cn(lora.className, "space-y-10")}>
				{faqItems.map((item) => (
					<div key={item.question}>
						<H2 className="mb-2">{item.question}</H2>
						<div className="text-foreground/90 leading-relaxed">{item.answer}</div>
					</div>
				))}
			</div>
		</Container>
	)
}
