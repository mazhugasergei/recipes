import "@/assets/styles"
import { inter, playfair } from "@/shared/config/fonts"
import { cn } from "@/shared/lib/cn"
import { Footer } from "@/widgets/footer/ui/footer"
import { Header } from "@/widgets/header/ui/header"

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ru">
			<body
				className={cn(
					playfair.variable,
					inter.variable,
					"bg-background text-foreground min-h-100dvh flex flex-col font-(family-name:--font-body) antialiased"
				)}
			>
				<Header />
				<main className="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
