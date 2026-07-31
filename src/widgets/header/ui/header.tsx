import { Container } from "@/shared/ui/container/container"
import { Logo } from "@/shared/ui/logo/logo"

export function Header() {
	return (
		<header className="sticky top-4 z-10 px-4">
			<Container className="text-primary-foreground flex items-center justify-between rounded-2xl bg-[#232323] py-2">
				<Logo />

				<span className="text-secondary-foreground text-xs tracking-widest uppercase">домашняя кухня</span>
			</Container>
		</header>
	)
}
