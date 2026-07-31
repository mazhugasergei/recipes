import "@/assets/styles"
import { Footer } from "@/widgets/footer/ui/footer"
import { Header } from "@/widgets/header/ui/header"
import { Inter, Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({
	subsets: ["latin", "cyrillic"],
	weight: ["600", "700"],
	variable: "--font-heading",
})
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-body" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ru">
			<body
				className={`${playfair.variable} ${inter.variable} bg-background text-foreground min-h-100dvh flex flex-col font-(family-name:--font-body) antialiased`}
			>
				<Header />
				<main className="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
