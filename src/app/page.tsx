import { getAllPostsMeta } from "@/entities/post"
import { PostsSearch } from "@/features/search-posts/ui/posts-search"
import { Container } from "@/shared/ui/container/container"
import { H1 } from "@/shared/ui/typography"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Рецепты от Наташи — домашняя кухня",
	description: "Простые домашние рецепты, проверенные временем — без лишних ингредиентов и сложных техник.",
}

export default function HomePage() {
	const posts = getAllPostsMeta()

	return (
		<Container className="py-16">
			<section className="mb-16">
				<H1 className="mb-4 max-w-lg">Домашние рецепты, проверенные временем</H1>
				<p className="text-foreground/70 max-w-md leading-relaxed">
					Простые блюда, которые готовятся у нас на кухне каждую неделю — без лишних ингредиентов и сложных техник.
				</p>
			</section>

			<div id="recipes">
				<PostsSearch posts={posts} />
			</div>
		</Container>
	)
}
