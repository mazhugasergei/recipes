import "@/assets/styles"
import { mainFont } from "@/shared/config/fonts"
import { cn } from "@/shared/lib/cn"
import { Container } from "@/shared/ui/container/container"
import { Footer } from "@/widgets/footer/ui/footer"
import { Header } from "@/widgets/header/ui/header"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: {
		template: "%s — Рецепты от Наташи",
		default: "Рецепты от Наташи — домашняя кухня",
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ru">
			<body className={cn(mainFont.className, "bg-background text-foreground min-h-100dvh flex flex-col antialiased")}>
				<Header />
				<Container className="flex-1 px-4 py-16 sm:px-6">{children}</Container>
				<Footer />
			</body>
		</html>
	)
}
