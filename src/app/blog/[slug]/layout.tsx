import { Container } from "@/shared/ui/container/container"
import Link from "next/link"

export default function PostLayout({ children }: { children: React.ReactNode }) {
	return (
		<Container className="py-16">
			<Link
				href="/"
				className="text-secondary hover:text-foreground mb-8 inline-block text-sm underline-offset-4 hover:underline"
			>
				← Все рецепты
			</Link>
			{children}
		</Container>
	)
}
