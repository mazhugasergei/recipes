import { Container } from "@/shared/ui/container/container"

export function Footer() {
	return (
		<footer className="p-4">
			<Container className="text-primary-foreground flex items-center justify-between rounded-2xl bg-[#232323] py-6">
				<p className="text-center text-sm text-white/60">Рецепты от Наташи — домашняя кухня</p>
			</Container>
		</footer>
	)
}
