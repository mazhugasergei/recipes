import Link from "next/link"

export default function PostLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Link
				href="/#recipes"
				className="text-secondary hover:text-foreground -m-2 mb-8 inline-block p-2 text-sm underline-offset-4 hover:underline"
			>
				← Все рецепты
			</Link>
			{children}
		</>
	)
}
