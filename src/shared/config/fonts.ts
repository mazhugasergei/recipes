import { Merriweather as HeadingFont, Lobster as LogoFont, Inter as MainFont, Lora as TextFont } from "next/font/google"

export const mainFont = MainFont({
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500"],
	variable: "--font-body",
})

export const textFont = TextFont({
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500"],
	variable: "--font-text",
})

export const logoFont = LogoFont({
	subsets: ["latin", "cyrillic"],
	weight: "400",
	variable: "--font-logo",
})

export const headingFont = HeadingFont({
	subsets: ["latin", "cyrillic"],
	weight: ["700"],
	variable: "--font-heading",
})
