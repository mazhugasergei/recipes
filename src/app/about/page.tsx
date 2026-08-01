import { lora } from "@/shared/config/fonts"
import { cn } from "@/shared/lib/cn"
import { H1 } from "@/shared/ui/typography"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "О сайте — Рецепты от Наташи",
	description: "О сайте «Рецепты от Наташи» — домашние рецепты, проверенные временем.",
}

export default function AboutPage() {
	return (
		<main>
			<H1 className="mb-6">О сайте</H1>
			<div className={cn(lora.className, "[&_p]:text-foreground/90 max-w-2xl space-y-4 leading-relaxed")}>
				<p>
					«Рецепты от Наташи» — это небольшой домашний блог с рецептами, которые проверены временем и готовятся на нашей
					кухне снова и снова. Здесь нет сложных техник и труднодоступных ингредиентов — только простые, понятные
					рецепты для повседневного стола.
				</p>
				<p>
					Каждый рецепт написан так, будто вы стоите рядом на кухне и готовите вместе с нами — с пояснениями, которые
					действительно помогают, а не просто перечисляют шаги.
				</p>
				<p>Если у вас есть вопросы или пожелания — загляните на страницу контактов, будем рады обратной связи.</p>
			</div>
		</main>
	)
}
