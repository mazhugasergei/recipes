import { Container } from "@/shared/ui/container/container"
import { Logo } from "@/shared/ui/logo/logo"

export function Header() {
	return (
		<header className="sticky top-4 z-10 px-4">
			<Container className="text-background flex items-center justify-between rounded-2xl bg-[#232323] px-6 py-2.5">
				<Logo />

				<span className="text-background text-xs tracking-widest uppercase max-sm:hidden">домашняя кухня</span>
			</Container>
		</header>
	)
}
