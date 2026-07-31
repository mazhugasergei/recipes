import { Inter, Lora, Marck_Script, Playfair_Display } from "next/font/google"

export const playfair = Playfair_Display({
	subsets: ["latin", "cyrillic"],
	weight: ["600", "700"],
	variable: "--font-heading",
})

export const inter = Inter({
	subsets: ["latin", "cyrillic"],
	variable: "--font-body",
})

export const lora = Lora({
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500"],
})

export const marckScript = Marck_Script({
	subsets: ["latin", "cyrillic"],
	weight: "400",
})
